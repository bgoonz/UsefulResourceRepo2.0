from django.contrib import admin
from .models import Note, PersonalNote


class NoteAdmin(admin.ModelAdmin):
<<<<<<< HEAD
    readonly_fields=('created_at', 'last_modified')
=======
    readonly_fields = ("created_at", "last_modified")

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# Register your models here.
admin.site.register(Note, NoteAdmin)
admin.site.register(PersonalNote)
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
