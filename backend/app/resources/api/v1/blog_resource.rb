module Api
  module V1
    class BlogResource < JSONAPI::Resource
      attributes :title, :description, :image_url, :author_name, :published_date, :user_id, :likes_count, :categories
      attributes :sub_heading

      before_save do
        @model.user_id = context[:current_user].id if @model.new_record?
      end

      def author_name
        @model.user.name
      end

      def published_date
        @model.created_at.strftime('%d %b, %Y')
      end

      def likes_count
        @model.likes.count
      end

      def categories
        @model.categories.pluck(:name)
      end

      def self.creatable_fields(context)
        super - %i[author_name published_date]
      end
    end
  end
end
