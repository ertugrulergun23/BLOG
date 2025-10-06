from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.text import slugify

'''
    Profiller , bloglar ve yorumların modelleri tamamlandı 
'''




class Profile(models.Model):
    user = models.OneToOneField(User , related_name='profil' , on_delete=models.CASCADE ,blank=True)
    id = models.AutoField(primary_key=True)
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
        if not self.slug:
            self.slug = slugify(self.tittle)
        self.full_clean()
        super().save(*args,**kwargs)
    
    def __str__(self):
        return self.tittle

    class Meta:
        verbose_name = 'Blog Yazısı'
        verbose_name_plural = 'Blog Yazıları'


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
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
    point = models.IntegerField(blank=True , null=True)

    def __str__(self):
        return f"{self.blog.tittle}-{self.author.name}"
    class Meta:
        verbose_name = 'Yorum'
        verbose_name_plural = 'Yorumlar'