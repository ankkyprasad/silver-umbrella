module Api
  module V1
    class LikeResource < JSONAPI::Resource
      attributes :likable_id, :likable_type

      before_save do
        @model.user_id = context[:current_user].id if @model.new_record?
      end
    end
  end
end
