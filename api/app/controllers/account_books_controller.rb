class AccountBooksController < ApplicationController
    include ActionController::MimeResponds
    require './lib/main_make_data'
    require './lib/create_data'
    require './lib/update_data'
    require './lib/delete_data'
    def index
        book_list = []
        Dir.foreach("#{Rails.root}/outputs/AccountBooks/") do |book|
            book = book.match(/(.+)_accountBook.json/)
            next if book.nil?
            # book_hash = {"date" => book[1]}
            book_list.push(book[1])
            # puts book[1]
        end
        book_list.sort!.reverse!
        # p book_list
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
        File.open("#{Rails.root}/outputs/AccountBooks/#{params[:date]}_accountBook.json") do |file|
            book = JSON.load(file)
            render json: book
        end
    end

    def update_from_TM
        main_make_data = Main_make_data.new
        if main_make_data.proc() == 2000
            error = {error: {code: 2000, msg: "TRADE_MARKET_ERROR_MSG_UNAUTHORIZED"}}
            render json: error
        end
    end

    def create
        create_data = Create_data.new()
        render json: create_data.proc(params)
    end

    def destroy
        delete_data = Delete_data.new()
        render json: delete_data.proc(params)
    end

    def update
        update_data = Update_data.new()
        render json: update_data.proc(params)
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
