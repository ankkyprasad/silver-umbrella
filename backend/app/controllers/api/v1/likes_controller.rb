# frozen_string_literal: true

module Api
  module V1
    class LikesController < ApplicationController
      include JSONAPI::ActsAsResourceController

      before_action :authenticate_devise_api_token!
      before_action :verify_valid_likable, only: %i[create destroy]

      def context
        { current_user: current_devise_api_user }
      end

      def create
        likable_id = params.dig(:data, :attributes, :likable_id)
        likable_type = params.dig(:data, :attributes, :likable_type)
        if Like.exists_for_user?(
          likable_id, likable_type, current_devise_api_user.id
        )
          return render json: { message: "#{likable_type} Already Liked." },
                        status: :bad_request
        end

        new_like = Like.create!(likable_id:, likable_type:, user_id: current_devise_api_user.id)
        serialized_like = JSONAPI::ResourceSerializer.new(LikeResource).serialize_to_hash(LikeResource.new(new_like,
                                                                                                           context))
        render json: serialized_like, status: :created
      end

      def destroy
        likable_id = params[:id]
        likable_type = params.dig(:data, :attributes, :likable_type)

        return render json: { message: "#{likable_type} Not Liked." }, status: :not_found unless Like.exists_for_user?(
          likable_id, likable_type, current_devise_api_user.id
        )

        Like.destroy_by(likable_id:, likable_type:, user_id: current_devise_api_user.id)
        render status: :no_content
      end

      private

      def verify_valid_likable
        likable_type = params.dig(:data, :attributes, :likable_type)
        return if Like::VALID_LIKABLES.include?(likable_type)

        render json: { message: 'Invalid likable_type.', valid_likable_types: Like::VALID_LIKABLES },
               status: :unprocessable_entity
      end
    end
  end
end
