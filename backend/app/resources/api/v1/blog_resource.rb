module Api
  module V1
    class BlogResource < JSONAPI::Resource
      attributes :title, :description, :image_url
    end
  end
end
