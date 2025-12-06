from django.urls import path,include
from .views import MyProfileView,BlogViewSet,CommentViewSet,ProfileViewSet,ProfileBlogs,BlogsComment
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'blogs',BlogViewSet,basename='blogs')
router.register(r'comments',CommentViewSet,basename='comments')
router.register(r'profiles',ProfileViewSet,basename='profiles')


urlpatterns = [
    path("profiles/me/",MyProfileView.as_view(),name="My Profile"),
    path("profiles/me/blogs/",ProfileBlogs.as_view(),name="My blogs"),
    path("blogs/<int:blog_pk>/comments/",BlogsComment.as_view(),name="Blog Comments"),
    path("",include(router.urls)),
]
