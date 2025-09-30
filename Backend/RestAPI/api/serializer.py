from ..models import Blog,Profile,Comment
from rest_framework import serializers


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment 
        fields = '__all__'
        


'''
# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Blog, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    blog_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id', 'user', 'bio', 'avatar', 'birth_date', 'location', 
            'website', 'created_at', 'updated_at', 'blog_count', 'comment_count'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_blog_count(self, obj):
        return obj.blogs.filter(status='published').count()

    def get_comment_count(self, obj):
        return obj.comments.count()


class ProfileUpdateSerializer(serializers.ModelSerializer):
    """Profil güncelleme için ayrı serializer"""
    class Meta:
        model = Profile
        fields = ['bio', 'avatar', 'birth_date', 'location', 'website']


class CommentSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(read_only=True)
    replies = serializers.SerializerMethodField()
    reply_count = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            'id', 'content', 'author', 'parent', 'is_approved',
            'created_at', 'updated_at', 'replies', 'reply_count'
        ]
        read_only_fields = ['id', 'author', 'created_at', 'updated_at', 'is_approved']

    def get_replies(self, obj):
        if obj.parent is None:  # Sadece ana yorumlar için alt yorumları getir
            replies = obj.replies.filter(is_approved=True)[:5]  # İlk 5 yanıt
            return CommentSerializer(replies, many=True, context=self.context).data
        return []

    def get_reply_count(self, obj):
        return obj.replies.filter(is_approved=True).count()


class CommentCreateSerializer(serializers.ModelSerializer):
    """Yorum oluşturma için ayrı serializer"""
    class Meta:
        model = Comment
        fields = ['content', 'parent']

    def validate_parent(self, value):
        if value and value.blog != self.context['blog']:
            raise serializers.ValidationError("Ana yorum bu blog yazısına ait değil.")
        return value


class BlogListSerializer(serializers.ModelSerializer):
    """Blog listesi için hafif serializer"""
    author = ProfileSerializer(read_only=True)
    comment_count = serializers.SerializerMethodField()
    tags_list = serializers.SerializerMethodField()
    read_time = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = [
            'id', 'title', 'slug', 'excerpt', 'author', 'status', 
            'featured_image', 'tags_list', 'view_count', 'comment_count',
            'created_at', 'updated_at', 'published_at', 'read_time'
        ]

    def get_comment_count(self, obj):
        return obj.comments.filter(is_approved=True).count()

    def get_tags_list(self, obj):
        return obj.get_tags_list()

    def get_read_time(self, obj):
        # Ortalama okuma hızı: dakikada 200 kelime
        word_count = len(obj.content.split())
        read_time = max(1, round(word_count / 200))
        return read_time


class BlogDetailSerializer(serializers.ModelSerializer):
    """Blog detayı için tam serializer"""
    author = ProfileSerializer(read_only=True)
    comments = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()
    tags_list = serializers.SerializerMethodField()
    read_time = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt', 'author', 'status',
            'featured_image', 'tags', 'tags_list', 'view_count', 'comments',
            'comment_count', 'created_at', 'updated_at', 'published_at', 'read_time'
        ]
        read_only_fields = ['id', 'author', 'view_count', 'created_at', 'updated_at']

    def get_comments(self, obj):
        # Sadece ana yorumları getir (parent=None)
        comments = obj.comments.filter(is_approved=True, parent=None)[:10]
        return CommentSerializer(comments, many=True, context=self.context).data

    def get_comment_count(self, obj):
        return obj.comments.filter(is_approved=True).count()

    def get_tags_list(self, obj):
        return obj.get_tags_list()

    def get_read_time(self, obj):
        word_count = len(obj.content.split())
        read_time = max(1, round(word_count / 200))
        return read_time


class BlogCreateUpdateSerializer(serializers.ModelSerializer):
    """Blog oluşturma ve güncelleme için serializer"""
    class Meta:
        model = Blog
        fields = [
            'title', 'slug', 'content', 'excerpt', 'status', 
            'featured_image', 'tags'
        ]

    def validate_slug(self, value):
        # Güncelleme sırasında mevcut slug'ı hariç tut
        blog_id = self.instance.id if self.instance else None
        if Blog.objects.filter(slug=value).exclude(id=blog_id).exists():
            raise serializers.ValidationError("Bu slug zaten kullanılıyor.")
        return value
'''