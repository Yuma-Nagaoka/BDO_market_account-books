require "date"

class Update_data

    def proc(params)
        old_accountBook = []
        new_accountBook = []
        bop = 0

        File.open("./outputs/AccountBooks/#{params[:date]}_accountBook.json") do |file|
            old_accountBook = JSON.load(file)
        end
        
        p "old", old_accountBook
        update_item = {}
        update_item.store("id", params[:id])
        update_item.store("date", params[:date])
        update_item.store("time", params[:time])
        update_item.store("type", params[:type]) 
        update_item.store("name", params[:name])
        update_item.store("pricePerOne", params[:pricePerOne].delete(",").to_i.to_s(:delimited))
        update_item.store("tradeCount", params[:tradeCount].delete(",").to_i.to_s(:delimited))
        update_item.store("accumulateMoneyCount", params[:accumulateMoneyCount].delete(",").to_i.to_s(:delimited))

        old_accountBook["items"][params[:index]] = update_item     #params[:tableData][:id]はindexと同等

        new_accountBook = old_accountBook

        #収支の更新
        new_accountBook["items"].each do |item|
            bop += item["accumulateMoneyCount"].delete(",").to_i if item["type"] == "販売"
            bop -= item["accumulateMoneyCount"].delete(",").to_i if item["type"] == "購入"
        end
        new_accountBook.store("BOP", bop)
        #
        
        File.open("./outputs/AccountBooks/#{params[:date]}_accountBook.json", "w") do |file|
            if new_accountBook.nil?
                new_accountBook = []
            end
            p "new", new_accountBook
            file.puts(JSON.pretty_generate(new_accountBook))
        end
        return new_accountBook
    end

end