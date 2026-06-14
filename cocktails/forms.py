from django import forms
from .models import Cocktail, Ingredient, CocktailIngrediets
from django.forms import inlineformset_factory

class CocktailForm(forms.ModelForm):
    class Meta:
        model = Cocktail
        fields = ['name', 'category', 'description', 'image']




CocktailIngredientFormSet = inlineformset_factory(
    Cocktail,
    CocktailIngrediets,
    fields=['ingredient', 'quantity', 'unit'],
    widgets={
        'quantity': forms.NumberInput(attrs={'min': '0', 'step': '0.1'})
    },
    extra=9,
    can_delete=True,
)

class IngredientForm(forms.ModelForm):
    class Meta:
        model = Ingredient
        fields = ['name', 'description', 'image']