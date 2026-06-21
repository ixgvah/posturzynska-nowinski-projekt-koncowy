from django.contrib import admin
from .models import Cocktail, Ingredient, CocktailIngrediets

# Register your models here.

admin.site.register(Cocktail)
admin.site.register(Ingredient)
admin.site.register(CocktailIngrediets)
