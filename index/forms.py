from django import forms
import smtplib

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

    def send_email(self, user, pwd, recipient, subject, body):
        FROM = user
        TO = recipient if isinstance(recipient, list) else [recipient]
        SUBJECT = subject
        TEXT = body

        # Prepare actual message
        message = f"From: {FROM}\nTo: {TO}\nSubject: {SUBJECT}\n\n{TEXT}"
        try:
            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.starttls()
            server.login(user, pwd)
            server.sendmail(FROM, TO, message)
            server.close()
            print('successfully sent the mail')
        except:
            print("failed to send mail")
