class Data_bdo
    @@biddingList = []
    @@buyList = []
    @@boughtList = []
    @@sellList = []
    @@soldList = []
    @@settledList = []
    @@accountBook = {}

    def initialize()
        @@biddingList = []
        @@buyList = []
        @@boughtList = []
        @@sellList = []
        @@soldList = []
        @@settledList = []
        @@accountBook = {}
    end

    def setBiddingList(bidding)
        @@biddingList.push(bidding)
    end
    def getBiddingList()
        return @@biddingList
    end
    def removeBiddingList(bidding)
        @@biddingList.delete(bidding)
    end
#

    def setBuyList(buy)
        @@buyList.push(buy)
    end
    def getBuyList()
        return @@buyList
    end
#

    def setBoughtList(bought)
        @@boughtList.push(bought)
    end
    def getBoughtList()
        return @@boughtList
    end
    def initBoughtList()
        @@boughtList = []
    end  
#

    def setSellList(sell)
        @@sellList.push(sell)
    end
    def getSellList()
        return @@sellList
    end
#

    def setSoldList(sold)
        @@soldList.push(sold)
    end
    def getSoldList()
        return @@soldList
    end
    def initSoldList()
        @@soldList = []
    end    
#

    def setSettledList(settled)
        @@settledList.push(settled)
    end
    def getSettledList()
        return @@settledList
    end
    def initSettledList()
        @@settledList = []
    end
#

    def setAccountBook(account)
        @@accountBook = account
    end
    def getAccountBook()
        return @@accountBook
    end
#
end
