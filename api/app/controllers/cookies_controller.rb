class CookiesController < ApplicationController
    def update
        File.open("./storage/.cookies", "w") do |file|
            file.write(params["cookies"])
        end
    end
end
