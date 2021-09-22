#!/usr/bin/env python
import os
import sys

<<<<<<< HEAD
if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'adv_project.settings')
=======
if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "adv_project.settings")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
