require "date"

class Delete_data

    def proc(params)
        old_accountBook = []
        new_accountBook = []

        File.open("./outputs/AccountBooks/#{params[:date]}_accountBook.json") do |file|
            old_accountBook = JSON.load(file)
        end

        p "old", old_accountBook
        old_accountBook["items"].delete_at(params[:index]) #ここにおけるidは配列のindexと同じ
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