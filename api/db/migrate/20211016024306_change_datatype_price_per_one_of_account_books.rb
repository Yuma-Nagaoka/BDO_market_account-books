class ChangeDatatypePricePerOneOfAccountBooks < ActiveRecord::Migration[6.1]
  def change
    change_column :account_books, :pricePerOne, :string
  end
end
