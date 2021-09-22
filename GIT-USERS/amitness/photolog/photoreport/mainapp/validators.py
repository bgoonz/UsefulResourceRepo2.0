import os
from django.core.exceptions import ValidationError


def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = [".zip"]
    if not ext.lower() in valid_extensions:
        raise ValidationError(u"Unsupported file extension.")


def validate_image_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = [".png", ".jpg", ".JPG", ".gif", ".bmp", ".jpeg"]
    if not ext.lower() in valid_extensions:
        raise ValidationError(u"Unsupported file extension.")
