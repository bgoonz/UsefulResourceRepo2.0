from django import forms
import json
from zipfile import ZipFile

from .models import InputFile


class InputForm(forms.ModelForm):
    zip_file = forms.FileField(
        widget=forms.ClearableFileInput(
            attrs={
                "label": "Select Input Zip File (no spaces in the file name)",
                "class": u"btn btn-primary btn-xl page-scroll",
                "placeholder": u"Enter Your Zip File",
                "accept": "application/zip",
            }
        )
    )

    class Meta:
        model = InputFile
        fields = ("zip_file",)

    def clean_zip_file(self):
        myfile = self.cleaned_data["zip_file"]
        archive = ZipFile(myfile, "r")
        photos = archive.namelist()
        for photo in photos:
            # check if folders/photos name have spaces
            if len(photo.split()) > 1 or photo.strip() != photo:
                raise forms.ValidationError(
                    "Zipped folders or photo names must not contain spaces."
                )
        valid_extensions = [".png", ".jpg", ".JPG", ".gif", ".bmp", ".jpeg", ".JPEG"]
        valid_files = [i for i in photos if "." + i.split(".")[-1] in valid_extensions]
        if not valid_files:
            raise forms.ValidationError("Image not found in zip.")
        return myfile


class TempFileForm(forms.Form):
    temp_file = forms.FileField(
        widget=forms.ClearableFileInput(
            attrs={
                "label": "Select Temp File",
                "class": u"btn btn-primary btn-xl page-scroll",
                "placeholder": u"Enter Your Temp File",
                "accept": "application/json",
            }
        )
    )
    data = forms.HiddenInput()

    def clean_temp_file(self):
        temp_file = self.cleaned_data["temp_file"]
        input_file_id = self.parse_data(temp_file)
        if not input_file_id:
            raise forms.ValidationError("Corrupted temp file.")
        else:
            self.data = input_file_id
        return temp_file

    def parse_data(self, temp_file):
        contents = temp_file.read().decode("utf-8")
        data = json.loads(contents)
        try:
            input_file_id = data.get("id")
        except:
            input_file_id = None
        return input_file_id

    def save(self, *args, **kwargs):
        return self.data
