class AddingAMembershipFromProject < AddingAResource

  def get_user_input
    people = ( User.all - @resource.project.members )
    present_form(project: @resource.project, people: people)
  end

end
