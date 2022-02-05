from django.shortcuts import render


# Create your views here.


def index(requests):
    return render(requests, 'index/index.html')


def about(requests):
    return render(requests, 'index/about.html')


def skills(requests):
    return render(requests, 'index/skills.html')


def contact(requests):
    return render(requests, 'index/contact.html')
