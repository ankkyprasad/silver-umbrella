Rails.application.routes.draw do
  constraints format: :json do
    namespace :api do
      namespace :v1 do
        devise_for :users, skip: %i[session], defaults: { format: :json }
        jsonapi_resources :blogs
      end
    end
  end
end
