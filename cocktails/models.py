from django.db import models
from django.conf import settings

# Create your models here.

class Ingredient(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='ingredients/', blank=True, null=True)

    def __str__(self):
        return self.name


class Cocktail(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cocktails', null=True, blank=True)
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='cocktails/', blank=True, null=True)
    date = models.DateField(auto_now=True)
    ingredients = models.ManyToManyField(Ingredient, through='CocktailIngrediets', blank = True)

    def __str__(self):
        return self.name


class CocktailIngrediets(models.Model):
    cocktail = models.ForeignKey(Cocktail, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.PROTECT)
    quantity = models.IntegerField(default=1)
    POSSIBLE_UNITS = [
        ('ml', 'ml'),
        ('oz', 'oz'),
        ('tsp', 'łyżeczka'),
        ('tbsp', 'łyżka'),
        ('piece', 'sztuka'),
        ('leaves', 'liść'),
    ]
    unit = models.CharField(max_length=50, choices=POSSIBLE_UNITS, default='ml')

    def __str__(self):
        return f"{self.ingredient}: {self.quantity} {self.unit}"

class UsersFavouriteCocktails(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cocktail = models.ForeignKey(Cocktail, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'cocktail')

    def __str__(self):
        return f"{self.user} - {self.cocktail}"


