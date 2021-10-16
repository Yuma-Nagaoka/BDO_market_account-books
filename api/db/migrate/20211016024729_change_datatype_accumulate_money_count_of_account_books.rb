class ChangeDatatypeAccumulateMoneyCountOfAccountBooks < ActiveRecord::Migration[6.1]
  def change
    change_column :account_books, :accumulateMoneyCount, :string
  end
end
