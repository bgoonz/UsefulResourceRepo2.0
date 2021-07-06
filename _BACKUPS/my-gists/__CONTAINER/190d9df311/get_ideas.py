ideas_to_migrate = []

print ('Collecting suggestions...')

# Loop through suggestions and figure out which ones need to be migrated.
for suggestion in suggestions:
    if suggestion['status']:
        status_type = suggestion['status']['name']
        if status_type.lower() != 'completed' and status_type.lower() != 'declined':
            ideas_to_migrate.append(suggestion)
    else:
        ideas_to_migrate.append(suggestion)