require 'net/http'
require 'uri'
require 'json'
require './lib/get_data'
require './lib/shape_data'
require './lib/data_bdo'

class Main_make_data
    def proc
        @@data_bdo = Data_bdo.new()
        p "変数を初期化しました。"

        get_data = Get_data.new()
        if get_data.getBiddingList == 2000
            return 2000
        end
        
        shape_data = Shape_data.new("")
        shape_data.splitBiddingList

        shape_sell_data = Shape_data.new("sell")
        shape_sell_data.makeUnsettledList
        
        shape_buy_data = Shape_data.new("buy")
        shape_buy_data.makeUnsettledList
        
        shape_data.makeAccountBook
    end
end
