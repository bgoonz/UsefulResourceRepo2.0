module AvatarImageHelper

  def avatar_image_for user, options={}
    options = { size: 64 }.merge(options)
    gravatar_image_tag(
      user.email + user.avatar_type.to_s,
      alt:      user.name,
      title:    user.name,
      gravatar: { default: user.avatar_type, size: options[:size] }
    )
  end

end
