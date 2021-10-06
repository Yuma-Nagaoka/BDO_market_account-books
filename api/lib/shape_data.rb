require 'net/https'
require 'uri'
require 'json'
require './lib/data_bdo'
require "date"

class Shape_data

    @@data_bdo = Data_bdo.new
    @mode = ""
    @bidding = ""
    @unsettled = ""
#modeによって行う動作を変えるため、その準備をしている。
    def initialize(mode_arg)
        # @@data_bdo.
        @mode = mode_arg
        case @mode 
        when "sell" then
            @bidding = "sell"
            @unsettled = "sold"
        when "buy" then
            @bidding = "buy"
            @unsettled = "bought"
        end
    end
#    
    
#取得したBiddingListから、sellとbuyに分ける
    def splitBiddingList
        
        puts "Split bidding list..."

        @@data_bdo.setBuyList(@@data_bdo.getBiddingList().dig(0,"buyList"))
        @@data_bdo.setSellList(@@data_bdo.getBiddingList().dig(0,"sellList"))

        File.open("./outputs/BiddingList/buyList.json", "w") do |file|
            # p @@data_bdo.getBuyList.flatten![0]
            src = JSON.pretty_generate(@@data_bdo.getBuyList[0])
            file.puts(src)
        end

        File.open("./outputs/BiddingList/sellList.json", "w") do |file|
            src = JSON.pretty_generate(@@data_bdo.getSellList[0])
            file.puts(src)
        end

        puts "Split bidding list has finished"
    end
#清算済みの物を判定/抽出してタイムスタンプの発行後、settledListを作成。modeによって分岐。100行目に定義してるmakeUnsettledListから呼び出し
    def makeSettledList
        dt = DateTime.now
        flg = 0
        old_settledList = []

        puts "Making settledList for #{@bidding}..."

        if File.exist?("./outputs/UnsettledList/#{@unsettled}List.json") then
            File.open("./outputs/UnsettledList/#{@unsettled}List.json") do |file| 
                # p @@data_bdo.getSoldList()[0], "\n"
                p "open #{@unsettled}List.json"
                unsettledList = JSON.load(file)
                
                unsettledList.each do |old_unsettled|
                    # p old_unsettled
                    # p old_unsettled["sellNo"]
                    # p @@data_bdo.getunsettledList()
                    # dt = DateTime.now
                #清算されたものがあればタイムスタンプを作成し、settledListに格納する。modeによる条件分岐。
                    case @mode 
                    when "sell" then
                        p "sell"
                        @@data_bdo.getSoldList().each do |new_sold|
                            if new_sold["sellNo"] == old_unsettled["sellNo"] then
                                p "統合取引所の予約販売欄に、同じ販売番号で未精算のものがまだあります。これは未清算のままで処理します。"
                                p old_unsettled
                                flg = 1
                            end
                        end
                    when "buy" then
                        p "buy"
                        @@data_bdo.getBoughtList().each do |new_bought|
                            if new_bought["buyNo"] == old_unsettled["buyNo"] then
                                p "統合取引所の予約購入欄に、同じ購入番号で未精算のものがまだあります。これは未清算のままで処理します。"
                                p old_unsettled
                                flg = 1
                            end
                        end
                    end
                    if flg == 0 then
                        p "統合取引所の予約欄に、同じ販売/購入番号で未精算のものがもうないです。これは清算されたという扱いで処理します。"
                        p old_unsettled
                        old_unsettled.store("date", dt.strftime("%Y-%m-%d"))
                        old_unsettled.store("time", dt.strftime("%H:%M:%S"))
                        @@data_bdo.setSettledList(old_unsettled)
                        p "以下が書き込む予定のデータです。", @@data_bdo.getSettledList
                    end
                #    
                end
            end
        else
            print "\"#{@unsettled}List.json\" is not exist\n"
        end

    #settledListの更新及び出力(jsonファイルは追記するとややこしいため、ファイルを読み込んでruby上で追記してから上書きしている)
        if !@@data_bdo.getSettledList.empty?    #新しく清算されたものがある際の処理
            if File.exist?("./outputs/SettledList/#{dt.strftime("%Y-%m-%d")}_settledList.json") then
                File.open("./outputs/SettledList/#{dt.strftime("%Y-%m-%d")}_settledList.json") do |file|
                    old_settledList = JSON.load(file)
                end
            end

            p "old", old_settledList[0]
            @@data_bdo.getSettledList.each do |row|
                old_settledList.push(row)
            end 
            new_settledList = old_settledList
            # p "new", new_settledList[0]
            
            File.open("./outputs/SettledList/#{dt.strftime("%Y-%m-%d")}_settledList.json", "w") do |file|
                if new_settledList.nil?
                    new_settledList = []
                end
                p "new", new_settledList
                file.puts(JSON.pretty_generate(new_settledList))
            end
            @@data_bdo.initSettledList()
        elsif !File.exist?("./outputs/SettledList/#{dt.strftime("%Y-%m-%d")}_settledList.json")  #新しく生産されたものがないかつ、settledList.jsonファイルがない場合
            File.open("./outputs/SettledList/#{dt.strftime("%Y-%m-%d")}_settledList.json", "w") do |file|
                file.puts(JSON.pretty_generate([]))
            end
        end
    #
        puts "Making settledList for #{@bidding} has finished"

    end
#unsettledListの作成、settledListの呼び出しも行う（メソッドの途中で呼び出さないと、処理する前にsold/boughtファイルを上書きしてしまう）
    def makeUnsettledList

        puts "Making unsettledList for #{@unsettled}..."

        dt = DateTime.now
        old_accountBook = []
        
    #販売確定後か前かを判定し、確定後ならsold/boughtListに格納する。modeによって分岐。
        case @mode
        when "sell" then
            @@data_bdo.getSellList()[0].each do |sell|
                #p sell["soldCount"]
                if sell["soldCount"] >= 1 then
                    @@data_bdo.setSoldList(sell)
                    p sell
                end
            end
        when "buy" then
            @@data_bdo.getBuyList()[0].each do |buy|
                #p buy["boughtCount"]
                if buy["boughtCount"] >= 1 then
                    @@data_bdo.setBoughtList(buy)
                    p buy
                end
            end
        end
    #       
    #清算済みの物を判定/抽出し、タイムスタンプの作成。modeによって分岐。
        makeSettledList
    #  
    
    #unsettledリストの更新（上書き）。modeによる条件分岐
        File.open("./outputs/UnsettledList/#{@unsettled}List.json", "w") do |file|
            case @mode 
            when "sell"
                file.puts(JSON.pretty_generate(@@data_bdo.getSoldList))
                # p "以下の内容を書きこむ"
                # p @@data_bdo.getSoldList
                @@data_bdo.initSoldList()
            when "buy"
                file.puts(JSON.pretty_generate(@@data_bdo.getBoughtList))
                # p "以下の内容を書きこむ"
                # p @@data_bdo.getBoughtList
                @@data_bdo.initBoughtList()
            end
        end
    #
        puts "Making unsettledList for #{@unsettled} has finished"

    end
#accountBookとbalance of paymentsの作成及び出力
    def makeAccountBook
        dt = DateTime.now
        balance_of_payments = 0

        puts "Making account book..."

        File.open("./outputs/SettledList/#{dt.strftime("%Y-%m-%d")}_settledList.json") do |file| 
            # p @@data_bdo.getSoldList()[0], "\n"
            settledList = JSON.load(file)
            account_hash = {}
            account_array = []
            
            settledList.each_with_index do |settled, index|
                bought_or_sold = ""
                buy_or_sell_jp = "" 
                # p settled["sellNo"]
                # p @@data_bdo.getsettledList()
                if !settled["sellNo"].nil?
                    buy_or_sell_jp = "販売"
                    bought_or_sold = "sold"
                elsif !settled["buyNo"].nil?
                    buy_or_sell_jp = "購入"
                    bought_or_sold = "bought"
                end

                account = {}
                account.store("id", index)
                account.store("date", dt.strftime("%Y-%m-%d"))
                account.store("time", dt.strftime("%H:%M:%S"))
                account.store("type", buy_or_sell_jp) 
                account.store("name", settled["name"])
                account.store("pricePerOne", settled["pricePerOne"].to_s(:delimited))
                account.store("tradeCount", settled["#{bought_or_sold}Count"].to_s(:delimited))
                accumulateMoneyCount = settled["#{bought_or_sold}Count"] * settled["pricePerOne"] 
                account.store("accumulateMoneyCount", accumulateMoneyCount.to_s(:delimited))
                account_array.push(account)
                
                balance_of_payments += accumulateMoneyCount if !settled["sellNo"].nil?
                balance_of_payments -= accumulateMoneyCount if !settled["buyNo"].nil?
            end
            account_hash.store("items", account_array)
            account_hash.store("BOP", balance_of_payments)
            @@data_bdo.setAccountBook(account_hash)
        end

        File.open("./outputs/AccountBooks/#{dt.strftime("%Y-%m-%d")}_accountBook.json", "w") do |file|
            file.puts(JSON.pretty_generate(@@data_bdo.getAccountBook))
        end
        # File.open("./outputs/AccountBooks/#{dt.strftime("%Y-%m-%d")}_balance_of_payments.txt", "w") do |file|
        #     src = {"date" => dt.strftime("%Y-%m-%d"), "BOP" => balance_of_payments}
        #     file.puts(src)
        # end

        puts "Making account book has finished"

    end
#
end