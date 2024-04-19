# frozen_string_literal: true

module Api
  module V1
    class UserResource < JSONAPI::Resource
      attributes :name, :email
    end
  end
end
