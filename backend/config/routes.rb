Rails.application.routes.draw do
  constraints format: :json do
    namespace :api do
      namespace :v1 do
        devise_for :users, skip: %i[session], defaults: { format: :json }
        jsonapi_resources :blogs
        jsonapi_resources :comments, except: %i[show update]
        jsonapi_resources :likes, only: %i[create destroy]
      end
    end
  end
end
