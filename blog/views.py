from django.shortcuts import render

# Create your views here.


def blog(requests):
    return render(requests, 'blog/blog.html')


def superelder(requests):
    return render(requests, 'blog/superelder.html')
