# frozen_string_literal: true

module Api
  module V1
    class RelationshipsController < ApplicationController
      include JSONAPI::ActsAsResourceController

      before_action :authenticate_devise_api_token!

      def context
        { current_user: current_devise_api_user }
      end
    end
  end
end
