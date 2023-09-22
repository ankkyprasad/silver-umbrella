module Api
  module V1
    class CommentsController < ApplicationController
      include JSONAPI::ActsAsResourceController

      before_action :authenticate_devise_api_token!
      before_action :find_comment, only: %i[destroy]

      def context
        { current_user: current_devise_api_user }
      end

      # def index
      #   unless Comment::VALID_COMMENTABLES.include?(params[:type])
      #     return render json: { message: 'Invalid commentable_type.', valid_commentable_types: Comment::VALID_COMMENTABLES }, status: :unprocessable_entity
      #   end

      #   comments = Comment.where(commentable_id: params[:id], commentable_type: params[:type])
      #   render json: { data: comments }, status: :ok
      # end

      def destroy
        return render json: { message: 'You are not allowed to delete this comment.' }, status: :unauthorized if @comment.user_id != current_devise_api_user.id

        return render status: :no_content if @comment.destroy

        render json: { message: 'Some error has occured.' }, status: :bad_request
      end

      private

      def find_comment
        @comment = Comment.find_by_id(params[:id])
        return render json: { message: 'Comment Not Found.' }, status: :not_found if @comment.nil?
      end
    end
  end
end
