class SessionsController < Devise::RegistrationsController
  disable_store_location :new
end
