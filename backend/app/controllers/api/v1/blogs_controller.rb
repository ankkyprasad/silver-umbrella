module Api
  module V1
    class BlogsController < ApplicationController
      include JSONAPI::ActsAsResourceController

      before_action :authenticate_devise_api_token!, only: %i[show create update destroy]
      before_action :validate_blog_author, only: %i[update destroy]

      def validate_blog_author
        user_id = Blog.find_by_id(params[:id])&.user_id

        return render status: 401 if current_devise_api_user.id != user_id
      end
    end
  end
end
