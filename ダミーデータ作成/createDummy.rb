for day in 11..31 do
    AccountBook.create(user_id: "admin", date: "2021-10-#{day}", type: "購 入", name: "test", pricePerOne: "1000", tradeCount: "1", accumulateMoneyCount: "1000",)   
end 
