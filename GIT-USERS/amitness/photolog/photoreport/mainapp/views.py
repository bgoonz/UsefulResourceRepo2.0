import StringIO

from django.views.generic import FormView, View
from django.core.files.base import ContentFile
from django.core.urlresolvers import reverse_lazy
from django.shortcuts import render, get_object_or_404

# from PIL import Image as PImage
from datetime import datetime
from django.http import HttpResponse, HttpResponseRedirect
from io import BytesIO
from PIL import Image as PImage
import json

from .generate_report import DocumentGenerator
from .forms import InputForm, TempFileForm
from .models import InputFile, Image


class LandingInputFileCreateView(FormView):
    """Module for landing page and accepting input zip file of photos."""

    form_class = InputForm
    template_name = "landing.html"

    def get_success_url(self, *args, **kwargs):
        input_id = str(self.obj.id)
        return reverse_lazy("preview", kwargs={"input_id": input_id})

    def form_valid(self, form):
        result = form.save()
        self.obj = result
        return super(LandingInputFileCreateView, self).form_valid(form)

    def get_context_data(self, **kwargs):
        context = super(LandingInputFileCreateView, self).get_context_data(**kwargs)
        return context


class TempFileResumeView(FormView):
    """Module for accepting tempfile to resume project."""

    template_name = "tempfile.html"
    form_class = TempFileForm

    def get_success_url(self, *args, **kwargs):
        input_id = str(self.input_file_id)
        return reverse_lazy("preview", kwargs={"input_id": input_id})

    def form_valid(self, form):
        self.input_file_id = form.save()
        return super(TempFileResumeView, self).form_valid(form)

    def get_context_data(self, **kwargs):
        context = super(TempFileResumeView, self).get_context_data(**kwargs)
        return context


class PhotoPreview(View):
    template_name = "preview.html"

    def get_context_data(self, **kwargs):
        context = {}
        input_id = self.kwargs.get("input_id")
        input_file = get_object_or_404(InputFile, id=int(input_id))

        # create new project if not created
        project = input_file.create_project()

        final_images = project.sorted_images
        context["images"] = final_images
        context["first_img"] = final_images[0]
        context["project"] = project

        return context

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, self.get_context_data())

    def post(self, request, *args, **kwargs):
        data = dict(request.POST)
        for key, value in data.items():
            if key == "csrfmiddlewaretoken":
                continue
            elif key == "project":
                project_name = value[0]
                input_id = self.kwargs.get("input_id")
                input_file = get_object_or_404(InputFile, id=int(input_id))
                input_file.project.name = project_name
                input_file.project.save()
                continue
            elif key.startswith("caption_"):
                img_id = key.split("_")[1]
                img = Image.objects.get(id=int(img_id))
                img.caption = value[0]
                rotate_angle = 0
                rotate_key = "rotate_" + img_id

                rotate_angle = data.get(rotate_key, ["0"])
                rotate_angle = int(rotate_angle[0])

                if rotate_angle in [90, 180, 270]:
                    image = PImage.open(img.image.path)
                    image = image.rotate(rotate_angle, expand=True)
                    try:
                        image.save(img.image.path)
                    except:
                        pass
                img.save()

        return HttpResponseRedirect(
            reverse_lazy("success", kwargs={"pk": input_file.id})
        )


class ReportGenView(View):
    template_name = "success.html"

    def get_context_data(self, **kwargs):
        context = {}
        return context

    def get(self, request, *args, **kwargs):
        input_id = self.kwargs.get("pk")
        input_file = get_object_or_404(InputFile, id=int(input_id))
        project = input_file.create_project()

        generate_report = request.GET.get("generate", False)
        download_tempfile = request.GET.get("tempfile", False)
        today_date = datetime.today().strftime("%Y-%m-%d")
        if generate_report:
            gen = DocumentGenerator()
            file_name = (
                project.name.replace(" ", "_") + "_" + today_date + "_PhotoLog.docx"
            )
            document = gen.create(project)

            f = BytesIO()
            document.save(f)
            length = f.tell()
            f.seek(0)
            response = HttpResponse(
                f.getvalue(),
                content_type="application/vnd.openxmlformats"
                + "-officedocument.wordprocessingml.document",
            )
            response["Content-Disposition"] = "attachment; filename=" + file_name
            response["Content-Length"] = length
            return response
        if download_tempfile:
            content = {"id": input_file.id}
            file_content = json.dumps(content)
            res = HttpResponse(file_content)
            file_name = (
                project.name.replace(" ", "_") + "_" + today_date + "_PhotoLog.json"
            )
            res["Content-Disposition"] = "attachment; filename=" + file_name
            return res
        return render(request, self.template_name, self.get_context_data())
