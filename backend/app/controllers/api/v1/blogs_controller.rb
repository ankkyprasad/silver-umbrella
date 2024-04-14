module Api
  module V1
    class BlogsController < ApplicationController
      include JSONAPI::ActsAsResourceController

      before_action :authenticate_devise_api_token!
      before_action :validate_blog_author, only: %i[update destroy]

      def context
        { current_user: current_devise_api_user }
      end

      def find_by_category
        category_name = params[:name]
        category = Category.find_by(name: category_name)
        return render json: { error: 'Category not found!' }, status: :not_found if category.nil?

        blogs = BlogCategoryMapping.where(category:).includes(:blog).map do |mapping|
          blog = mapping.blog
          blog_resource_data = JSONAPI::ResourceSerializer.new(Api::V1::BlogResource).serialize_to_hash(Api::V1::BlogResource.new(
                                                                                                          blog, context
                                                                                                        ))[:data]
          blog_resource_data['attributes'].merge({ id: blog_resource_data['id'] })
        end
        render json: { data: blogs }
      end

      private

      def validate_blog_author
        user_id = Blog.find_by_id(params[:id])&.user_id

        render status: 401 if current_devise_api_user.id != user_id
      end
    end
  end
end
