# frozen_string_literal: true

module Api
  module V1
    class RelationshipResource < JSONAPI::Resource
      attributes :follower_id, :followee_id
    end
  end
end
