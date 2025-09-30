from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone




class Profile(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    bio = models.TextField(max_length=500 , blank=True)
    avatar = models.ImageField(upload_to='avatars/' , blank=True , null=True)
    birth_date = models.DateField(blank=True , null=True)

    def __str__(self):
        return f"{self.name}-{self.surname}"
    
    class Meta:
        verbose_name = 'Profil'
        verbose_name_plural = 'Profiller'


class Blog(models.Model):
    STATUS_CHOICES = [
        ('draft' , 'Taslak'),
        ('published' , 'Yayınlandı'),
        ('archived' , 'Arşivledni')
    ]



    id = models.AutoField(primary_key=True)
    tittle = models.CharField(max_length=100)
    slug = models.SlugField(max_length=200 , unique=True,null=True)
    content = models.TextField()
    image = models.ImageField(upload_to='images/' , null=True)
    point = models.FloatField(null=True)
    published_at = models.DateField(null=True)
    author = models.ForeignKey(
        Profile ,
        on_delete = models.CASCADE ,
        related_name = 'blogs' ,
        verbose_name='Yazar',
        null=True
    )
    status = models.CharField(
        max_length=255 ,
        choices=STATUS_CHOICES,
        default='draft',
        verbose_name='Durum'
    )


    # Doğrulama tanımlama işlemi
    def clean(self):
        # Eğer point null değilse doğrulama işlemini yap
        if self.point is not None:
            if self.point < 0 or self.point > 5:
                raise ValidationError("Puan 0 ile 5 arasında olmalı!")
        
    # Doğrulama fonksiyonunu çalıştırıp veriyi kaydeden fonksiyon 
    def save(self,*args,**kwargs):
        if self.status=='published' and not self.published_at:
            self.published_at=timezone.now()
        self.full_clean()
        super().save(*args,**kwargs)
    
    def __str__(self):
        return self.tittle

    class Meta:
        verbose_name = 'Blog Yazısı'
        verbose_name_plural = 'Blog Yazıları'


class Comment(models.Model):
    blog = models.ForeignKey(
        Blog, 
        on_delete=models.CASCADE, 
        related_name='comments',
        verbose_name='Blog Yazısı'
    )
    author = models.ForeignKey(
        Profile, 
        on_delete=models.CASCADE, 
        related_name='comments',
        verbose_name='Yazar'
    )
    content = models.TextField(verbose_name='Yorum İçeriği')
    parent = models.ForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True, 
        related_name='replies',
        verbose_name='Ana Yorum'
    )

    def __str__(self):
        return f"{self.blog.tittle}-{self.author.name}"


    class Meta:
        verbose_name = 'Yorum'
        verbose_name_plural = 'Yorumlar'



'''
# models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(max_length=500, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True)
    website = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

    class Meta:
        verbose_name = 'Profil'
        verbose_name_plural = 'Profiller'


class Blog(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Taslak'),
        ('published', 'Yayınlandı'),
        ('archived', 'Arşivlendi'),
    ]

    title = models.CharField(max_length=200, verbose_name='Başlık')
    slug = models.SlugField(max_length=200, unique=True)
    content = models.TextField(verbose_name='İçerik')
    excerpt = models.TextField(max_length=300, blank=True, help_text='Kısa açıklama')
    author = models.ForeignKey(
        Profile, 
        on_delete=models.CASCADE, 
        related_name='blogs',
        verbose_name='Yazar'
    )
    status = models.CharField(
        max_length=10, 
        choices=STATUS_CHOICES, 
        default='draft',
        verbose_name='Durum'
    )
    featured_image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    tags = models.CharField(max_length=200, blank=True, help_text='Virgülle ayrılmış etiketler')
    view_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.status == 'published' and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def get_tags_list(self):
        if self.tags:
            return [tag.strip() for tag in self.tags.split(',')]
        return []

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Blog Yazısı'
        verbose_name_plural = 'Blog Yazıları'
        ordering = ['-created_at']


class Comment(models.Model):
    blog = models.ForeignKey(
        Blog, 
        on_delete=models.CASCADE, 
        related_name='comments',
        verbose_name='Blog Yazısı'
    )
    author = models.ForeignKey(
        Profile, 
        on_delete=models.CASCADE, 
        related_name='comments',
        verbose_name='Yazar'
    )
    content = models.TextField(verbose_name='Yorum İçeriği')
    parent = models.ForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True, 
        related_name='replies',
        verbose_name='Ana Yorum'
    )
    is_approved = models.BooleanField(default=True, verbose_name='Onaylandı')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.author.user.username} - {self.blog.title[:50]}"

    def get_replies(self):
        return Comment.objects.filter(parent=self, is_approved=True)

    class Meta:
        verbose_name = 'Yorum'
        verbose_name_plural = 'Yorumlar'
        ordering = ['-created_at']


# signals.py (Profile otomatik oluşturma için)
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()

'''