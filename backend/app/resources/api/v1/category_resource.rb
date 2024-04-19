# frozen_string_literal: true

module Api
  module V1
    class CategoryResource < JSONAPI::Resource
      attributes :name
    end
  end
end
