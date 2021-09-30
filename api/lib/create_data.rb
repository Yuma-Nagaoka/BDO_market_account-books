require "date"

class Create_data

    def proc(params)
        old_accountBook = []
        new_accountBook = []
        dt = DateTime.now

        File.open("./outputs/AccountBooks/#{params[:date]}_accountBook.json") do |file|
            old_accountBook = JSON.load(file)
        end

        p "old", old_accountBook
        new_item = {}
        new_item.store("id", old_accountBook["items"].length)
        new_item.store("date", params[:date])
        new_item.store("time", params[:time])
        new_item.store("type", params[:type]) 
        new_item.store("name", params[:name])
        new_item.store("pricePerOne", params[:pricePerOne].to_i.to_s(:delimited))
        new_item.store("tradeCount", params[:tradeCount].to_i.to_s(:delimited))
        new_item.store("accumulateMoneyCount", params[:accumulateMoneyCount].to_i.to_s(:delimited))
        old_accountBook["items"].push(new_item)

        old_accountBook.store("BOP", old_accountBook["BOP"] + params[:accumulateMoneyCount].to_i) if params[:type] == "sell"
        old_accountBook.store("BOP", old_accountBook["BOP"] - params[:accumulateMoneyCount].to_i) if params[:type] == "buy"

        new_accountBook = old_accountBook
        
        File.open("./outputs/AccountBooks/#{params[:date]}_accountBook.json", "w") do |file|
            if new_accountBook.nil?
                new_accountBook = []
            end
            p "new", new_accountBook
            file.puts(JSON.pretty_generate(new_accountBook))
        end
    end

end