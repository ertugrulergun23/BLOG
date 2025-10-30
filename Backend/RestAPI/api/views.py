from ..models import Blog,Profile,Comment
from .serializer import BlogSerializer,ProfileSerializer,CommentSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

class BlogList(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class BlogDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serialzier_class = CommentSerializer

class MyProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    # Gelen isteğin sahibi olan kullanıcıyı (request.user) bulur
    # ve o kullanıcının profilini döndürür.
    def get_object(self):
        return self.request.user.profil
