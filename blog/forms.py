from contextlib import nullcontext
from pyexpat.errors import messages
from django import forms
from tinymce.widgets import TinyMCE


class Login(forms.Form):
    Username = forms.EmailField(widget=forms.TextInput(
        attrs={'placeholder': 'Username', 'autocomplete': 'off'}))
    Password = forms.CharField(widget=forms.PasswordInput(
        attrs={'placeholder': 'Password', 'autocomplete': 'off'}))


class Blog(forms.Form):
    FAVORITE_COLORS_CHOICES = [
        ('blue', 'Blue'),
        ('green', 'Green'),
        ('black', 'Black'),
    ]

    Title = forms.CharField(widget=forms.TimeInput(
        attrs={'placeholder': 'Title', 'autocomplete': 'off'}))
    Tags = forms.MultipleChoiceField(
        widget=forms.SelectMultiple, choices=FAVORITE_COLORS_CHOICES)
    content = forms.CharField(widget=TinyMCE())
