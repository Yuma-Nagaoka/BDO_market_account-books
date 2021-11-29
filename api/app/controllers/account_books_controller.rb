class AccountBooksController < ApplicationController
    include ActionController::MimeResponds
    require './lib/main_make_data'

    def index
        book_list = []
        BalanceOfPayment.all.each do |bop|
            book_list.push(bop.date)
        end
        book_list.sort!.reverse!
        p book_list
        render json: book_list
    end

    def show
        results = {}
        results.store("items", AccountBook.where(user_id: 'admin').where(date: params[:date]))
        results.store("BOP", BalanceOfPayment.where(user_id: 'admin').find_by(date: params[:date]).value)
        p results
        render json: results
    end
#統合取引所とアイテムを連動して帳簿を作成する
    def update_from_TM
        main_make_data = Main_make_data.new
        results = main_make_data.proc()
        if results == 2000
            error = {error: {code: 2000, msg: "TRADE_MARKET_ERROR_MSG_UNAUTHORIZED"}}
            render json: error
        else
            p results
            results["items"].each do |result|
                AccountBook.create(user_id:'admin', date: result["date"], time: result["time"], type: result["type"], name: result["name"], 
                pricePerOne: result["pricePerOne"], tradeCount: result["tradeCount"], accumulateMoneyCount: result["accumulateMoneyCount"])
            end
            #収支の計算と更新
            if BalanceOfPayment.where(user_id: 'admin').find_by(date: results["date"]).nil?
                BalanceOfPayment.create(user_id: 'admin', date: results["date"], value: results["BOP"])
            else
                balanceOfPayment = BalanceOfPayment.where(user_id: 'admin').find_by(date: results["date"])
                bop = balanceOfPayment.value
                bop += results["BOP"]
                p bop
                balanceOfPayment.update(value: bop)
            end
        end
    end

    def create
        AccountBook.create(user_id:'admin', date: params[:date], time: params[:time], type: params[:type], name: params[:name], 
        pricePerOne: params[:pricePerOne].to_i.to_s(:delimited), tradeCount: params[:tradeCount].to_i.to_s(:delimited), accumulateMoneyCount: params[:accumulateMoneyCount].to_i.to_s(:delimited) )
        #収支の計算と更新
        balanceOfPayment = BalanceOfPayment.where(user_id: 'admin').find_by(date: params[:date])
        bop = balanceOfPayment.value
        bop += params[:accumulateMoneyCount].to_i if params[:type] == "販売"
        bop -= params[:accumulateMoneyCount].to_i if params[:type] == "購入"
        balanceOfPayment.update(value: bop)

        show()
    end

    def destroy
        AccountBook.find(params[:id]).destroy
        #収支の計算と更新
        balanceOfPayment = BalanceOfPayment.where(user_id: 'admin').find_by(date: params[:date])
        bop = balanceOfPayment.value
        bop -= params[:accumulateMoneyCount].delete(",").to_i if params[:type] == "販売"    #削除するカラムの値段を収支から差し引きするため、カラムの値段からカンマを削除してintに変換する
        bop += params[:accumulateMoneyCount].delete(",").to_i if params[:type] == "購入"
        p bop
        BalanceOfPayment.where(user_id: 'admin').find_by(date: params[:date]).update(value: bop)

        show()
    end

    def update
        updateAccountBook = AccountBook.find(params[:id])

        old_moneyCount = updateAccountBook.accumulateMoneyCount
        old_type = updateAccountBook.type
        #既にカンマを含んでいる数値の場合（値を変えずにそのまま更新したとき）があるため、一度カンマを削除してから再度カンマを付与する
        updateAccountBook.update(date: params[:date], time: params[:time], type: params[:type], name: params[:name], 
        pricePerOne: params[:pricePerOne].delete(",").to_i.to_s(:delimited), tradeCount: params[:tradeCount].delete(",").to_i.to_s(:delimited), 
        accumulateMoneyCount: params[:accumulateMoneyCount].delete(",").to_i.to_s(:delimited))
        #収支の計算と更新
        balanceOfPayment = BalanceOfPayment.where(user_id: 'admin').find_by(date: params[:date])
        bop = balanceOfPayment.value
        #変更前の値をbopから差し引き、変更後の値を加える。
        bop -= old_moneyCount.delete(",").to_i if old_type == "販売"
        bop += old_moneyCount.delete(",").to_i if old_type == "購入"
        bop += params[:accumulateMoneyCount].delete(",").to_i if params[:type] == "販売"
        bop -= params[:accumulateMoneyCount].delete(",").to_i if params[:type] == "購入"
        balanceOfPayment.update(value: bop)

        show()
    end

end
