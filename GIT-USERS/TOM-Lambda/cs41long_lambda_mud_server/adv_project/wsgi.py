"""
WSGI config for adv_project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

<<<<<<< HEAD
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'adv_project.settings')
=======
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "adv_project.settings")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

application = get_wsgi_application()
