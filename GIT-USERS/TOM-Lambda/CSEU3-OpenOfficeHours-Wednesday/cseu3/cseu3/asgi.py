"""
ASGI config for cseu3 project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

<<<<<<< HEAD
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cseu3.settings')
=======
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cseu3.settings")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

application = get_asgi_application()
