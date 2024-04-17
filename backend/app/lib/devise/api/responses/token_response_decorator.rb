# frozen_string_literal: true

module Devise::Api::Responses::TokenResponseDecorator
  def body
    new_resource_owner = default_body[:resource_owner].merge({ name: resource_owner.name, slug: resource_owner.slug })
    default_body.merge({ resource_owner: new_resource_owner })
  end
end
