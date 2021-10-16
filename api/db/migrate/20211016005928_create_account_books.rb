class CreateAccountBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :account_books do |t|
      t.string :user_id
      t.integer :index
      t.string :date
      t.string :time
      t.string :type
      t.string :name
      t.integer :pricePerOne
      t.integer :tradeCount
      t.integer :accumulateMoneyCount

      t.timestamps
    end
  end
end
