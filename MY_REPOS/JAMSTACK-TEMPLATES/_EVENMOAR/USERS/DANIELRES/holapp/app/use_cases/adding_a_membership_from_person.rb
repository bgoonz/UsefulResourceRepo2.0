class AddingAMembershipFromPerson < AddingAResource

  def get_user_input
    projects = ( Project.all - @resource.person.projects )
    present_form(person: @resource.person, projects: projects)
  end

end
