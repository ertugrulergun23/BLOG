from django.contrib import admin
from .models import Blog
from .models import Profile
from .models import Comment

admin.site.register(Blog)
admin.site.register(Profile)
admin.site.register(Comment)


# Register your models here.
