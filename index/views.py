from django.shortcuts import render
from . forms import Contact
from django.contrib import messages
import os


# Create your views here.


def index(requests):
    return render(requests, 'index/index.html')


def about(requests):
    return render(requests, 'index/about.html')


def skills(requests):
    return render(requests, 'index/skills.html')


def contact(requests):
    if requests.method == 'POST':
        form = Contact(requests.POST)
        if form.is_valid():
            person_email = requests.POST.get('email')
            person_name = requests.POST.get('name')
            person_subject = requests.POST.get('subject')
            person_message = requests.POST.get('message')
            email_to = os.environ.get('EMAIL_TO')
            user = os.environ.get('EMAIL')
            password = os.environ.get('EMAIL_PASSWORD')
            try:
                form.send_email(
                    user=user, pwd=password, recipient=email_to,
                    subject=person_subject,
                    body=f'Mail from\nName:{person_name}\nEmail:{person_email}\nMessage:{person_message}')
                messages.success(requests, 'Thank you for contacting me')
            except:
                messages.ERROR(
                    requests, 'There was some error Please contact me via linkedin')
    else:
        form = Contact()
    return render(requests, 'index/contact.html', {
        'form': form
    })
