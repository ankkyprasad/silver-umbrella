# frozen_string_literal: true

module Api
  module V1
    class CommentResource < JSONAPI::Resource
      attributes :content, :commenter_name, :likes, :liked_by_user, :published_time_text, :published_by_user,
                 :commentable_id, :commentable_type, :user_id
      filters :commentable_id, :commentable_type

      before_save do
        @model.user_id = context[:current_user].id if @model.new_record?
      end

      def self.default_sort
        [{ field: 'created_at', direction: :desc }]
      end

      def fetchable_fields
        super - %i[commentable_id commentable_type]
      end

      def commenter_name
        User.find_by_id(@model.user_id).name
      end

      def likes
        @model.likes.count
      end

      def liked_by_user
        Like.exists?(likable_id: @model.id, likable_type: @model.class.name, user_id: context[:current_user].id)
      end

      def published_time_text
        time_difference = (Time.zone.now - @model.created_at).to_i
        units, unit_name = if time_difference < 1.minute
                             [time_difference, 'second']
                           elsif time_difference < 1.hour
                             [time_difference / 1.minute, 'minute']
                           elsif time_difference < 1.day
                             [time_difference / 1.hour, 'hour']
                           elsif time_difference < 1.week
                             [time_difference / 1.day, 'day']
                           elsif time_difference < 1.month
                             [time_difference / 1.week, 'week']
                           elsif time_difference < 1.year
                             [time_difference / 1.month, 'month']
                           else
                             [time_difference / 1.year, 'year']
                           end

        "#{units} #{pluralize(units, unit_name)} ago"
      end

      def published_by_user
        @model.user_id == context[:current_user].id
      end

      private

      def pluralize(count, word)
        count == 1 ? word : "#{word}s"
      end
    end
  end
end
