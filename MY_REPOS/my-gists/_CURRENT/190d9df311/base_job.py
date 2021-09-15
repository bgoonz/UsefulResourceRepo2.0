class BaseJobResource(Resource):
    def dispatch_request(
        self, provider: str, owner_name: str, repo_name: str, build_number: int, job_number: int, *args, **kwargs
    ) -> Response:
        queryset = Job.query.join(Build, Build.id == Job.build_id).join(
            Repository, Repository.id == Build.repository_id
        ).filter(
            Repository.provider == RepositoryProvider(provider),
            Repository.owner_name == owner_name,
            Repository.name == repo_name,
            Build.number == build_number,
            Job.number == job_number,
        )
        if self.is_mutation():
            queryset = queryset.with_for_update()
        job = queryset.first()
        if not job:
            return self.not_found()

        return Resource.dispatch_request(self, job, *args, **kwargs)
