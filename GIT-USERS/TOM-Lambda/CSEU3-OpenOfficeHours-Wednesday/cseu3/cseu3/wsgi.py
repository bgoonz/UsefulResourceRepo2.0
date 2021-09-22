"""
WSGI config for cseu3 project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

<<<<<<< HEAD
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cseu3.settings')
=======
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cseu3.settings")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

application = get_wsgi_application()
