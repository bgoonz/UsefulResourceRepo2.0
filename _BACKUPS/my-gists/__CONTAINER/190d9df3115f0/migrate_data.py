migration_count = str(len(ideas_to_migrate))
print ("Number of suggestions to migrate: " + migration_count)

target_repo = g.get_repo(GITHUB_TARGET_REPO)

counter = 0
print ('Kicking off migration to GitHub...')
for idea in ideas_to_migrate:
    counter += 1
    print ('Migrating idea ' + str(counter) + ' of ' + migration_count + "...")

    idea_text = '_No details provided._'

    if idea['text']:
        idea_text = f.clean(idea['text'])

    # String that defines the attribution block of the issue.
    attribution_string = '\n\n----------\n⚠ Idea migrated from UserVoice\n\n' + '**Created By:** ' + idea['creator']['name'] + '\n**Created On:** ' + idea['created_at'] + '\n**Votes at Migration:** ' + str(idea['vote_count']) + '\n**Supporters at Migration:** ' + str(idea['supporters_count'])

    # Define labels
    labels = []
    if idea['status']:
        status_type = idea['status']['name']
        if status_type.lower() == 'under review' or status_type.lower() == 'planned':
            labels.append('triaged')
        elif status_type.lower() == 'started':
            labels.append('in-progress')


    target_repo.create_issue(f.clean(idea['title']), idea_text + attribution_string, labels=labels)