from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .serializers import ProjectSerializer

from .models import Project


class ProjectImageOrderUpdate(RetrieveUpdateDestroyAPIView):

    """
    Update image order of a project.
    """

    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    lookup_field = "pk"
