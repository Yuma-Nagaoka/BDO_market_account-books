class CreateBalanceOfPayments < ActiveRecord::Migration[6.1]
  def change
    create_table :balance_of_payments do |t|
      t.string :date
      t.string :user_id
      t.integer :value

      t.timestamps
    end
  end
end
