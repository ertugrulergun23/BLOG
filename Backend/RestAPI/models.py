from django.db import models

class Blog(models.Model):
    id = models.AutoField(primary_key=True)
    tittle = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to='images/' , null=True)
    point = models.FloatField(null=True)


    # Doğrulama tanımlama işlemi
    def clean(self):
        # Eğer point null değilse doğrulama işlemini yap
        if self.point is not None:
            if self.point < 0 or self.point > 5:
                raise ValidationError("Puan 0 ile 5 arasında olmalı!")
        
    # Doğrulama fonksiyonunu çalıştırıp veriyi kaydeden fonksiyon 
    def save(self,*args,**kwargs):
        self.full_clean()
        super().save(*args,**kwargs)
