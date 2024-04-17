# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      include JSONAPI::ActsAsResourceController

      before_action :authenticate_devise_api_token!, only: %i[find_by_slug]

      def find_by_slug
        slug = params[:slug]
        user = User.find_by(slug:)
        return render json: { error: 'User not found' }, status: :not_found if user.nil?

        data = {
          id: user.id,
          name: user.name,
          slug: user.slug,
          followers: user.followings.count,
          followings: user.follows.count
        }

        if current_devise_api_user.id != user.id
          data = data.merge({ follows_user: Relationship.exists?(follower_id: current_devise_api_user.id,
                                                                 followee_id: user.id) })
        end

        render json: { data: }
      end

      def find_slug_by_id
        user = User.find_by_id(params[:id])
        return render json: { error: 'User not found' }, status: :not_found if user.nil?

        render json: { data: { slug: user.slug } }
      end
    end
  end
end
