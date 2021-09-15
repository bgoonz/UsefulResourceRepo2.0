class ExpressionsController < InheritedResources::Base
  load_and_authorize_resource

  rescue_from CanCan::AccessDenied do |exception|
    case action_name
      when 'new'
        msg = { :notice => t(:sign_in_or_sign_up_to_create_expression) }
      else
        msg = { :alert  => exception.message }
    end
    redirect_to new_user_session_path, msg
  end
  def show
    expression = Expression.find params[:id]
    @expression = ExpressionPresenter.new( view_context, expression ).to_html :individual
  end
  def create
    @expression = Expression.new(params[:expression])
    @expression.author = current_user
    @expression.language = Language.find_by_code(locale)
    create!
  end
  def index
    @expressions_count = Expression.in(params[:locale]).recent().count
    @expressions       = Expression.in(params[:locale]).recent().page(params[:page]).per(10)
  end
end
