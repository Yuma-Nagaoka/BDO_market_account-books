require "date"

class Delete_data

    def proc(params)
        old_accountBook = []
        new_accountBook = []
        bop = 0

        File.open("./outputs/AccountBooks/#{params[:date]}_accountBook.json") do |file|
            old_accountBook = JSON.load(file)
        end

        p "old", old_accountBook
        old_accountBook["items"].delete_at(params[:index]) #ここにおけるidは配列のindexと同じ
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