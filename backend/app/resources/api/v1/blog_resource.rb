# frozen_string_literal: true

module Api
  module V1
    class BlogResource < JSONAPI::Resource
      attributes :title, :description, :image_url, :author_name, :published_date, :user_id, :likes_count, :categories
      attributes :sub_heading, :read_time, :liked_by_user

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

      def read_time
        word_count = @model.description.split(' ').count
        average_words_read_per_minute = 200.to_f
        (word_count / average_words_read_per_minute).ceil
      end

      def liked_by_user
        Like.exists?(likable_id: @model.id, likable_type: @model.class.name, user_id: context[:current_user].id)
      end

      def self.creatable_fields(context)
        super - %i[author_name published_date]
      end

      def self.default_sort
        [{field: 'created_at', direction: :desc}, {field: 'title', direction: :desc}]
      end      
    end
  end
end
