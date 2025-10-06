from django.apps import AppConfig


class RestapiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "RestAPI"

    def ready(self):
        import RestAPI.signal
