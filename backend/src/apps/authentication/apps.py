from django.apps import AppConfig


class AuthenticationConfig(AppConfig):
    name = 'apps.authentication'
    label = 'authentication'
    verbose_name = 'Authentication'
    default_auto_field = 'django.db.models.BigAutoField'
