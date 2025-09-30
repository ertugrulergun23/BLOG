from ..models import Blog,Profile,Comment
from .serializer import BlogSerializer,ProfileSerializer,CommentSerializer
from rest_framework import generics

class BlogList(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


'''
# views.py
from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Profile, Blog, Comment
from .serializers import (
    ProfileSerializer, ProfileUpdateSerializer,
    BlogListSerializer, BlogDetailSerializer, BlogCreateUpdateSerializer,
    CommentSerializer, CommentCreateSerializer
)
from .permissions import IsAuthorOrReadOnly


# Profile Views
class ProfileListView(generics.ListAPIView):
    """Tüm profilleri listele"""
    queryset = Profile.objects.all().select_related('user')
    serializer_class = ProfileSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['user__username', 'user__first_name', 'user__last_name', 'bio']
    ordering_fields = ['created_at', 'user__date_joined']
    ordering = ['-created_at']


class ProfileDetailView(generics.RetrieveAPIView):
    """Profil detayını görüntüle"""
    queryset = Profile.objects.all().select_related('user')
    serializer_class = ProfileSerializer
    lookup_field = 'user__username'


class ProfileUpdateView(generics.UpdateAPIView):
    """Kendi profilini güncelle"""
    serializer_class = ProfileUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile


# Blog Views
class BlogListView(generics.ListAPIView):
    """Yayınlanmış blog yazılarını listele"""
    serializer_class = BlogListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['author', 'status']
    search_fields = ['title', 'content', 'tags']
    ordering_fields = ['created_at', 'published_at', 'view_count']
    ordering = ['-published_at']

    def get_queryset(self):
        queryset = Blog.objects.filter(status='published').select_related('author__user')
        
        # Etiket filtreleme
        tag = self.request.query_params.get('tag')
        if tag:
            queryset = queryset.filter(tags__icontains=tag)
        
        # Yazar filtreleme (username ile)
        author_username = self.request.query_params.get('author_username')
        if author_username:
            queryset = queryset.filter(author__user__username=author_username)
            
        return queryset


class BlogDetailView(generics.RetrieveAPIView):
    """Blog yazısı detayını görüntüle"""
    queryset = Blog.objects.filter(status='published').select_related('author__user')
    serializer_class = BlogDetailSerializer
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Görüntülenme sayısını artır
        instance.view_count += 1
        instance.save(update_fields=['view_count'])
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class BlogCreateView(generics.CreateAPIView):
    """Yeni blog yazısı oluştur"""
    serializer_class = BlogCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.profile)


class BlogUpdateView(generics.UpdateAPIView):
    """Blog yazısını güncelle (sadece yazar)"""
    serializer_class = BlogCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]
    lookup_field = 'slug'

    def get_queryset(self):
        return Blog.objects.filter(author=self.request.user.profile)


class BlogDeleteView(generics.DestroyAPIView):
    """Blog yazısını sil (sadece yazar)"""
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]
    lookup_field = 'slug'

    def get_queryset(self):
        return Blog.objects.filter(author=self.request.user.profile)


class MyBlogsView(generics.ListAPIView):
    """Kullanıcının kendi blog yazıları"""
    serializer_class = BlogListSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']

    def get_queryset(self):
        return Blog.objects.filter(author=self.request.user.profile)


# Comment Views
class CommentListView(generics.ListAPIView):
    """Belirli bir blog yazısının yorumları"""
    serializer_class = CommentSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        blog_slug = self.kwargs['blog_slug']
        blog = get_object_or_404(Blog, slug=blog_slug, status='published')
        return Comment.objects.filter(
            blog=blog, 
            is_approved=True, 
            parent=None  # Sadece ana yorumlar
        ).select_related('author__user')


class CommentCreateView(generics.CreateAPIView):
    """Yeni yorum oluştur"""
    serializer_class = CommentCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        blog_slug = self.kwargs['blog_slug']
        blog = get_object_or_404(Blog, slug=blog_slug, status='published')
        serializer.save(author=self.request.user.profile, blog=blog)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        blog_slug = self.kwargs['blog_slug']
        context['blog'] = get_object_or_404(Blog, slug=blog_slug, status='published')
        return context


class CommentUpdateView(generics.UpdateAPIView):
    """Yorumu güncelle (sadece yorum sahibi)"""
    serializer_class = CommentCreateSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]

    def get_queryset(self):
        return Comment.objects.filter(author=self.request.user.profile)


class CommentDeleteView(generics.DestroyAPIView):
    """Yorumu sil (sadece yorum sahibi)"""
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]

    def get_queryset(self):
        return Comment.objects.filter(author=self.request.user.profile)


class MyCommentsView(generics.ListAPIView):
    """Kullanıcının kendi yorumları"""
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        return Comment.objects.filter(author=self.request.user.profile).select_related('blog', 'author__user')


# Utility Views
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def blog_tags_view(request):
    """Tüm blog etiketlerini getir"""
    blogs = Blog.objects.filter(status='published', tags__isnull=False).exclude(tags='')
    tags_set = set()
    
    for blog in blogs:
        tags_list = blog.get_tags_list()
        tags_set.update(tags_list)
    
    tags_list = sorted(list(tags_set))
    return Response({'tags': tags_list})


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def search_view(request):
    """Blog ve profillerde arama"""
    query = request.GET.get('q', '')
    if not query:
        return Response({'blogs': [], 'profiles': []})

    # Blog arama
    blogs = Blog.objects.filter(
        Q(title__icontains=query) | 
        Q(content__icontains=query) | 
        Q(tags__icontains=query),
        status='published'
    ).select_related('author__user')[:10]

    # Profil arama
    profiles = Profile.objects.filter(
        Q(user__username__icontains=query) |
        Q(user__first_name__icontains=query) |
        Q(user__last_name__icontains=query) |
        Q(bio__icontains=query)
    ).select_related('user')[:10]

    return Response({
        'blogs': BlogListSerializer(blogs, many=True).data,
        'profiles': ProfileSerializer(profiles, many=True).data
    })
'''