from rest_framework import serializers, viewsets
from .models import PersonalNote

<<<<<<< HEAD
class PersonalNoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PersonalNote
        fields = ('title', 'content')

    def create(self, validated_data):
        user = self.context['request'].user
        note = PersonalNote.objects.create(user=user, **validated_data)
        return note

=======

class PersonalNoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PersonalNote
        fields = ("title", "content")

    def create(self, validated_data):
        user = self.context["request"].user
        note = PersonalNote.objects.create(user=user, **validated_data)
        return note


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class PersonalNoteViewSet(viewsets.ModelViewSet):
    serializer_class = PersonalNoteSerializer
    queryset = PersonalNote.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            PersonalNote.objects.none()
        else:
<<<<<<< HEAD
            return PersonalNote.objects.filter(user=user)
=======
            return PersonalNote.objects.filter(user=user)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
