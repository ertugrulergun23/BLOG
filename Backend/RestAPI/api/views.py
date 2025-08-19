from models import Blog
from serializer import BlogSerializer
from rest_framework import generics

class BlogDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer