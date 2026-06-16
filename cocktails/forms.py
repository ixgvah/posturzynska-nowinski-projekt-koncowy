from django import forms
from .models import Cocktail, Ingredient, CocktailIngrediets
from django.forms import inlineformset_factory

INPUT_CLASS = 'auth-field__input'


class CocktailForm(forms.ModelForm):
    class Meta:
        model = Cocktail
        fields = ['name', 'category', 'description', 'image']
        widgets = {
            'name': forms.TextInput(attrs={'class': INPUT_CLASS}),
            'category': forms.TextInput(attrs={'class': INPUT_CLASS}),
            'description': forms.Textarea(attrs={'class': f'{INPUT_CLASS} auth-field__textarea', 'rows': 4}),
            'image': forms.FileInput(attrs={'class': 'auth-field__file'}),
        }


class CocktailIngredientForm(forms.ModelForm):
    class Meta:
        model = CocktailIngrediets
        fields = ['ingredient', 'quantity', 'unit']
        widgets = {
            'ingredient': forms.Select(attrs={'class': INPUT_CLASS}),
            'quantity': forms.NumberInput(attrs={'class': INPUT_CLASS, 'min': '0', 'step': '0.1'}),
            'unit': forms.Select(attrs={'class': INPUT_CLASS}),
        }


CocktailIngredientFormSet = inlineformset_factory(
    Cocktail,
    CocktailIngrediets,
    form=CocktailIngredientForm,
    extra=5,
    can_delete=True,
)


class IngredientForm(forms.ModelForm):
    class Meta:
        model = Ingredient
        fields = ['name', 'description', 'image']
