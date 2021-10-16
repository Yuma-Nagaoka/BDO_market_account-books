Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'account_books', to: 'account_books#index'
  get 'account_books/:date', to: 'account_books#show'
  post 'account_books/update', to: 'account_books#update_from_TM'
  post 'account_books/:date', to: 'account_books#create'
  delete 'account_books/:date', to: 'account_books#destroy'
  patch 'account_books/:date', to: 'account_books#update'
  post 'credential_update', to: 'cookies#update'
  get 'dummy', to: 'account_books#dummy'
  get 'dummy_bop', to: 'account_books#dummy_bop'
end
