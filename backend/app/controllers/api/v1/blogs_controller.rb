# frozen_string_literal: true

module Api
  module V1
    class BlogsController < ApplicationController
      include JSONAPI::ActsAsResourceController

      before_action :authenticate_devise_api_token!
      before_action :validate_blog_author, only: %i[update destroy add_categories remove_category]

      def context
        { current_user: current_devise_api_user }
      end

      def find_by_category
        category_name = params[:name]
        category = Category.find_by(name: category_name)
        return render json: { error: 'Category not found!' }, status: :not_found if category.nil?

        blogs = BlogCategoryMapping.where(category:).includes(:blog).map do |mapping|
          blog = mapping.blog
          blog_resource_data = JSONAPI::ResourceSerializer.new(Api::V1::BlogResource).serialize_to_hash(
            Api::V1::BlogResource.new(
              blog, context
            )
          )[:data]
          blog_resource_data['attributes'].merge({ id: blog_resource_data['id'] })
        end
        render json: { data: blogs }
      end

      def add_categories
        category_ids = params.dig(:data, :attributes, :category_ids)
        blog_id = params.dig(:data, :attributes, :blog_id)
        illegal_category_ids = category_ids.select { |id| Category.exists?(id:) == false }

        if illegal_category_ids.present?
          return render json: { error: "categories with id #{illegal_category_ids.join(', ')} not found!!" },
                        status: :unprocessable_entity
        end

        blog_category_mapping = category_ids.map do |id|
          { blog_id:, category_id: id }
        end

        BlogCategoryMapping.create!(blog_category_mapping)
        render json: 'Categories added successfully!', status: :created
      end

      def remove_category
        category_id = params.dig(:data, :attributes, :category_id)
        blog_id = params.dig(:data, :attributes, :blog_id)
        BlogCategoryMapping.destroy_by(category_id:, blog_id:)
        render status: :no_content
      end

      private

      def validate_blog_author
        user_id = Blog.find_by_id(params[:id] || params.dig(:data, :attributes, :blog_id))&.user_id

        render status: 401 if current_devise_api_user.id != user_id
      end
    end
  end
end
