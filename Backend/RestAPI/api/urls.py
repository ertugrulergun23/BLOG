from django.urls import path
from .views import BlogDetail

urlpatterns = [
    path("/blogdetail",BlogDetail.as_view(),name="Blog Detail"),
]
