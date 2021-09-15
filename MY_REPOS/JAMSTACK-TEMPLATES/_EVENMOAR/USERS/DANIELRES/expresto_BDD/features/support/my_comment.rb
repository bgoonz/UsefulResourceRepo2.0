  def my_comment
    @my_comment ||= Comment.new( user: logged_user, body: 'Frosty moon' )
  end
