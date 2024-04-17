# frozen_string_literal: true

module Api
  module V1
    class RelationshipResource < JSONAPI::Resource
      attributes :follower_id, :followee_id

      before_save do
        @model.follower_id = context[:current_user].id if @model.new_record?
      end
    end
  end
end
