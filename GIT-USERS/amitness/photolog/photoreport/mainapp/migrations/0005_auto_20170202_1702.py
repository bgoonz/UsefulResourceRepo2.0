# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-02 17:02
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models
import re


class Migration(migrations.Migration):

    dependencies = [("mainapp", "0004_image_thumbnail")]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="image_order",
            field=models.TextField(
                validators=[
                    django.core.validators.RegexValidator(
                        re.compile("^\\d+(?:\\,\\d+)*\\Z"),
                        code="invalid",
                        message="Enter only digits separated by commas.",
                    )
                ]
            ),
        )
    ]
