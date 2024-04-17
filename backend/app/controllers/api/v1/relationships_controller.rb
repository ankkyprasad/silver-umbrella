# frozen_string_literal: true

module Api
  module V1
    class RelationshipsController < ApplicationController
      include JSONAPI::ActsAsResourceController

      before_action :authenticate_devise_api_token!
      before_action :set_follower_id

      def context
        { current_user: current_devise_api_user }
      end

      def destroy
        follower_id = params.dig(:data, :attributes, :follower_id)
        followee_id = params.dig(:data, :attributes, :followee_id)

        if User.exists?(id: followee_id) == false
          return render json: { error: 'followee not found' },
                        status: :unprocessable_entity
        end

        Relationship.destroy_by(followee_id:, follower_id:)
        render status: :no_content
      end

      private

      def set_follower_id
        params[:data][:attributes][:follower_id] = current_devise_api_user.id
      end
    end
  end
end
