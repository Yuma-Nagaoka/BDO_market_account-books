class ChangeDatatypeTradeCountOfAccountBooks < ActiveRecord::Migration[6.1]
  def change
    change_column :account_books, :tradeCount, :string
  end
end
