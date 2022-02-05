from pyexpat.errors import messages
from django import forms


class Contact(forms.Form):
    email = forms.EmailField(widget=forms.TextInput(
        attrs={'placeholder': 'Email', 'autocomplete': 'off'}))
    name = forms.CharField(max_length=50, error_messages={
        'required': 'Name cannot be empty',
        'max_length': 'Please enter name shorter than 50 characters'
    }, widget=forms.TextInput(
        attrs={'placeholder': 'Name', 'autocomplete': 'off'}))
    subject = forms.CharField(max_length=100, widget=forms.TextInput(
        attrs={'placeholder': 'Subject', 'autocomplete': 'off'}))
    message = forms.CharField(max_length=300, widget=forms.Textarea(
        attrs={'placeholder': 'Message', 'autocomplete': 'off'}))
