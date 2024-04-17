# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      include JSONAPI::ActsAsResourceController

      def find_by_slug
        slug = params[:slug]
        user = User.find_by(slug:)
        return render json: { error: 'User not found' }, status: :not_found if user.nil?

        user = {
          id: user.id,
          name: user.name,
          slug: user.slug,
          followers: user.followings.count,
          followings: user.follows.count
        }

        render json: { data: user }
      end
    end
  end
end
