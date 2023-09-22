module Api
  module V1
    class CommentResource < JSONAPI::Resource
      attributes :content, :commenter_name, :likes, :commentable_id, :commentable_type, :liked_by_user

      filters :commentable_id, :commentable_type

      before_save do
        @model.user_id = context[:current_user].id if @model.new_record?
      end

      def self.default_sort
        [{ field: 'created_at', direction: :desc }]
      end

      def self.creatable_fields(context)
        super - %i[commenter_name]
      end

      def commenter_name
        User.find_by_id(@model.user_id).name
      end

      def likes
        @model.likes.count
      end

      def liked_by_user
        Like.exists?(likable_id: @model.id, likable_type: @model.class.name, user_id: @model.user_id)
      end
    end
  end
end
