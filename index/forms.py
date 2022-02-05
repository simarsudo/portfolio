from django import forms

class Contact(forms.Form):
    email = forms.CharField()