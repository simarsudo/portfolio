from django.shortcuts import render
from django.views import View
from . forms import Blog, Login, Tags
from . models import blogsModel

# Create your views here.


class BlogView(View):
    def get(self, requests):
        blogs = blogsModel.initial_blogs()
        tags = Tags()
        return render(requests, 'blog/blog.html', {
            'blogs': blogs, 'tags': tags
        })

    def post(self, requests, *args, **kwargs):
        pass


def superelder(requests):
    login = Login()
    blog = Blog()
    return render(requests, 'blog/superelder.html', {
        'login': login, 'blog': blog
    })
