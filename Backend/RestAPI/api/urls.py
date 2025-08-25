from django.urls import path
from .views import BlogDetail

urlpatterns = [
    path("blogs",BlogDetail.as_view(),name="Blog Detail"),
]
