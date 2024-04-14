module Api
  module V1
    class CommentsController < ApplicationController
      include JSONAPI::ActsAsResourceController

      before_action :authenticate_devise_api_token!
      before_action :find_comment, only: %i[destroy]

      def context
        { current_user: current_devise_api_user }
      end

      def destroy
        if @comment.user_id != current_devise_api_user.id
          return render json: { message: 'You are not allowed to delete this comment.' },
                        status: :unauthorized
        end

        return render status: :no_content if @comment.destroy

        render json: { message: 'Some error has occured.' }, status: :bad_request
      end

      private

      def find_comment
        @comment = Comment.find_by_id(params[:id])
        render json: { message: 'Comment Not Found.' }, status: :not_found if @comment.nil?
      end
    end
  end
end
