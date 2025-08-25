from ..models import Blog
from .serializer import BlogSerializer
from rest_framework import generics

class BlogDetail(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer