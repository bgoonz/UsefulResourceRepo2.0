class Ability
  include CanCan::Ability

  def initialize(user)

    user ||= User.new

    if user.role == "admin"
      can    :manage, :all
    else
      can    :read,   :all
      cannot :escape_analytics
    end


    unless user.new_record?
      can :create,  Expression
      can :update,  Expression do |expression|
        ( expression.author_id == user.id ) &&
        ( expression.created_at > Time.now - 30.minutes)
      end
      can :destroy, Expression do |expression|
        ( expression.author_id == user.id ) &&
        ( expression.created_at > Time.now - 10.minutes)
      end
      can :update,  User do |u|
        user.id == u.id
      end
      can :create,  Comment
      can :destroy, Comment do |comment|
        ( comment.user_id == user.id ) &&
        ( comment.created_at > Time.now - 3.minutes)
      end
      can :create,  Translation
    end

  end
end
