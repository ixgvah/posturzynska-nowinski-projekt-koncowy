from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import User

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'auth-field__input', 'autocomplete': 'username'}),
            'email': forms.EmailInput(attrs={'class': 'auth-field__input', 'autocomplete': 'email'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        field_attrs = {
            'username': {'class': 'auth-field__input', 'autocomplete': 'username'},
            'email': {'class': 'auth-field__input', 'autocomplete': 'email'},
            'password1': {'class': 'auth-field__input', 'autocomplete': 'new-password'},
            'password2': {'class': 'auth-field__input', 'autocomplete': 'new-password'},
        }
        for name, attrs in field_attrs.items():
            self.fields[name].widget.attrs.update(attrs)


class CustomAuthenticationForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({
            'class': 'auth-field__input',
            'autocomplete': 'username',
        })
        self.fields['password'].widget.attrs.update({
            'class': 'auth-field__input',
            'autocomplete': 'current-password',
        })