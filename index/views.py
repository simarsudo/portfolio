from django.http import HttpResponseRedirect
from django.shortcuts import render
from . forms import Contact
from django.contrib import messages


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
            messages.success(requests, 'Thank you for contacting me')

    else:
        form = Contact()
    return render(requests, 'index/contact.html', {
        'form': form
    })
