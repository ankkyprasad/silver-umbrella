Rails.application.routes.draw do
  constraints format: :json do
    namespace :api do
      namespace :v1 do
        devise_for :users, skip: %i[session], defaults: { format: :json }
        jsonapi_resources :users, only: %i[] do
          collection do
            get :find_by_slug
            get :find_slug_by_id
          end
        end
        jsonapi_resources :blogs do
          collection do
            get :find_by_category
          end
        end
        jsonapi_resources :comments, except: %i[show update]
        jsonapi_resources :likes, only: %i[create destroy]
        jsonapi_resources :categories, only: %i[index]
      end
    end
  end
end
