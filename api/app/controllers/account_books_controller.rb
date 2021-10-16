class AccountBooksController < ApplicationController
    include ActionController::MimeResponds
    require './lib/main_make_data'
    require './lib/create_data'
    require './lib/update_data'
    require './lib/delete_data'
    def index
        book_list = []
        BalanceOfPayment.all.each do |bop|
            book_list.push(bop.date)
        end
        book_list.sort!.reverse!
        # Dir.foreach("#{Rails.root}/outputs/AccountBooks/") do |book|
        #     book = book.match(/(.+)_accountBook.json/)
        #     next if book.nil?
        #     # book_hash = {"date" => book[1]}
        #     book_list.push(book[1])
        #     # puts book[1]
        # end
        # book_list.sort!.reverse!
        p book_list
        render json: book_list
    end

    def show
        # @date = params[:date]
        # respond_to do |format|
        #     format.html
        #     format.xlsx do
        #       generate_xlsx # xlsxファイル生成用メソッド
        #     end
        #   end
        # File.open("#{Rails.root}/outputs/AccountBooks/#{params[:date]}_accountBook.json") do |file|
        #     book = JSON.load(file)
        #     render json: book
        # end
        results = {}
        results.store("items", AccountBook.where(user_id: 'admin').where(date: params[:date]))
        results.store("BOP", BalanceOfPayment.where(user_id: 'admin').find_by(date: params[:date]).value)
        p results
        render json: results
    end

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
        # create_data = Create_data.new()
        # render json: create_data.proc(params)
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
        # delete_data = Delete_data.new()
        # render json: delete_data.proc(params)
        AccountBook.find(params[:id]).destroy
        #収支の計算と更新
        balanceOfPayment = BalanceOfPayment.where(user_id: 'admin').find_by(date: params[:date])
        bop = balanceOfPayment.value
        bop -= params[:accumulateMoneyCount].delete(",").to_i if params[:type] == "販売"
        bop += params[:accumulateMoneyCount].delete(",").to_i if params[:type] == "購入"
        p bop
        BalanceOfPayment.where(user_id: 'admin').find_by(date: params[:date]).update(value: bop)

        show()
    end

    def update
        # update_data = Update_data.new()
        # render json: update_data.proc(params)
        updateAccountBook = AccountBook.find(params[:id])

        old_moneyCount = updateAccountBook.accumulateMoneyCount
        old_type = updateAccountBook.type

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
    # private

    # def generate_xlsx
    #     Axlsx::Package.new do |p|
    #       p.workbook.add_worksheet(name: "シート名") do |sheet|      
    #         sheet.add_row ["First Column", "Second", "Third"]
    #         sheet.add_row [1, 2, 3]
    #       end
    #       send_data(p.to_stream.read,
    #                 type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    #                 filename: "sample.xlsx")
    #     end
    # end
end
