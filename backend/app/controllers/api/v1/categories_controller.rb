module Api
  module V1
    class CategoriesController < ApplicationController
      include JSONAPI::ActsAsResourceController

      before_action :authenticate_devise_api_token!
    end
  end
end
