from contextlib import nullcontext
from pyexpat.errors import messages
from django import forms
from tinymce.widgets import TinyMCE
from . models import get_tags


class Login(forms.Form):
    Username = forms.EmailField(widget=forms.TextInput(
        attrs={'placeholder': 'Username', 'autocomplete': 'off'}))
    Password = forms.CharField(widget=forms.PasswordInput(
        attrs={'placeholder': 'Password', 'autocomplete': 'off'}))


class Blog(forms.Form):
    tags = get_tags()
    Title = forms.CharField(widget=forms.TimeInput(
        attrs={'placeholder': 'Title', 'autocomplete': 'off'}))
    Tags = forms.MultipleChoiceField(
        widget=forms.SelectMultiple, choices=tags)
    content = forms.CharField(widget=TinyMCE())


class Tags(forms.Form):
    tags = get_tags()
    order = (('Descending', 'Descending'),('Ascending', 'Ascending'))
    Tags = forms.MultipleChoiceField(
        widget=forms.SelectMultiple, choices=tags)
    order_by = forms.ChoiceField(choices=order)
