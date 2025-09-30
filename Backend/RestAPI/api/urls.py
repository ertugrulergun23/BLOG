from django.urls import path
from .views import BlogList,ProfileList,CommentList

urlpatterns = [
    path("blogs",BlogList.as_view(),name="Blog List"),
    path("profiles",ProfileList.as_view(),name="Profile List"),
    path("comments",CommentList.as_view(),name="Comment List"),
]
