from ..models import Blog,Profile,Comment
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Blog
        fields = '__all__'

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class ProfileSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    blog = serializers.PrimaryKeyRelatedField(
        queryset = Blog.objects.all()
    )
    point = serializers.IntegerField(
        validators = [
            MinValueValidator(0, message="Değer 0'dan küçük olamaz."),
            MaxValueValidator(5, message="Değer 5'ten büyük olamaz.")
        ]
    )
    class Meta:
        model = Comment 
        fields = '__all__'