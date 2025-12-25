from ..models import Blog,Profile,Comment
from .serializer import BlogSerializer,ProfileSerializer,CommentSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.profil)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.profil)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class MyProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    # Gelen isteğin sahibi olan kullanıcıyı (request.user) bulur
    # ve o kullanıcının profilini döndürür.
    def get_object(self):
        return self.request.user.profil
    

class ProfileBlogs(generics.ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        queryset = self.request.user.profil
        blogs = queryset.blogs.all()
        return blogs
    
class BlogsComment(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        blog_pk = self.kwargs['blog_pk']
        queryset=Comment.objects.filter(blog_id=blog_pk)
        return queryset
