from distutils.log import Log
from django.shortcuts import render
from . forms import Blog, Login

# Create your views here.


def blog(requests):
    return render(requests, 'blog/blog.html')


def superelder(requests):
    login = Login()
    blog = Blog()
    return render(requests, 'blog/superelder.html', {
        'login': login, 'blog': blog
    })
