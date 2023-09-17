module Api
  module V1
    class BlogResource < JSONAPI::Resource
      attributes :title, :description, :image_url, :author_name, :published_date

      def author_name
        @model.user.name
      end

      def published_date
        @model.created_at.strftime('%d %b')
      end
    end
  end
end
