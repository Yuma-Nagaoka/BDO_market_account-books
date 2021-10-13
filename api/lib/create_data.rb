require "date"

class Create_data

    def proc(params)
        old_accountBook = []
        new_accountBook = []
        dt = DateTime.now
        bop = 0

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

        # old_accountBook["BOP"] = old_accountBook["BOP"].to_i + params[:accumulateMoneyCount].delete(",").to_i if params[:type] == "販売"
        # old_accountBook["BOP"] = old_accountBook["BOP"].to_i - params[:accumulateMoneyCount].delete(",").to_i if params[:type] == "購入"

        # p "BOP", old_accountBook["BOP"]

        new_accountBook = old_accountBook

        #収支の更新
        new_accountBook["items"].each do |item|
            bop += item["accumulateMoneyCount"].delete(",").to_i if item["type"] == "販売"
            bop -= item["accumulateMoneyCount"].delete(",").to_i if item["type"] == "購入"
        end
        new_accountBook.store("BOP", bop)
        #
        
        File.open("./outputs/AccountBooks/#{params[:date]}_accountBook.json", "w") do |file|
            p "new", new_accountBook
            file.puts(JSON.pretty_generate(new_accountBook))
        end
        return new_accountBook
    end

end