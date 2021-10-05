require 'net/https'
require 'uri'
require 'json'
require './lib/data_bdo'
require "date"
require 'logger'

class Get_data

    @@data_bdo = Data_bdo.new

#    
    def getBiddingList

        puts "Getting bidding list..."

        headers = {
        'authority' => 'trade.jp.playblackdesert.com',
        'content-length' => '0',
        'sec-ch-ua' => '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        'accept' => '*/*',
        'x-requested-with' => 'XMLHttpRequest',
        'sec-ch-ua-mobile' => '?0',
        'user-agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
        'origin' => 'https://trade.jp.playblackdesert.com',
        'sec-fetch-site' => 'same-origin',
        'sec-fetch-mode' => 'cors',
        'sec-fetch-dest' => 'empty',
        'referer' => 'https://trade.jp.playblackdesert.com/Home/list/hot',
        'accept-language' => 'ja,en-US;q=0.9,en;q=0.8'
        }

        cookies =  ""

        File.open("./storage/.cookies") do |file|#cookieの読み込み
            cookies = file.gets
        end
        # logger.debug(cookies)

        # p cookies
        
        uri = URI.parse("https://trade.jp.playblackdesert.com/Home/GetMyBiddingList")
        http = Net::HTTP.new(uri.host, uri.port)
        #p uri
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE

        req = Net::HTTP::Post.new(uri.path)
        # headers.each do |k,v| 　←　req.initialize_http_headerの代用
        #     req[k] = v
        # end
        req.initialize_http_header(headers)
        req['Cookie'] = cookies
        res = http.request(req)

        if JSON.parse(res.body)["resultCode"] != 0 then #|| res.code != "200"
            result = JSON.parse(res.body)
            print "\e[31mError: ", result["resultMsg"], "\e[0m\n"
            puts "Please renew cookies" 
            return result["resultCode"]
        end
        # res = Net::HTTP.new(uri.host, uri.port).start do |http|
        #     http.request(req)
        # end   

        File.open("./outputs/BiddingList/biddingList.json", "w") do |file|
            file.puts(res.body)
        end

        # puts res.code
        # puts res.body   
        @@data_bdo.setBiddingList(JSON.parse(res.body))

        # p @@data_bdo.getbiddingList().dig(0,"buyList")

        puts "Getting bidding list has finished"

    end
#
end