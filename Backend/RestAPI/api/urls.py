from django.urls import path
from .views import BlogList,ProfileList,CommentList,BlogDetail,ProfileDetail,CommentDetail

urlpatterns = [
    path("blogs/",BlogList.as_view(),name="Blog List"),
    path("profiles/",ProfileList.as_view(),name="Profile List"),
    path("comments/",CommentList.as_view(),name="Comment List"),
    path("blogs/<int:pk>",BlogDetail.as_view(),name="Blog Detail"),
    path("profiles/<int:pk>",ProfileDetail.as_view(),name="Profile Detail"),
    path("comments/<int:pk>",CommentDetail.as_view(),name="Comment Detail"),
]
