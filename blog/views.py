from django.http import HttpResponse
from django.shortcuts import render
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from . forms import Blog, Login, Tags
from . models import blogsModel
import json

# Create your views here.


class BlogView(View):

    def get(self, requests):
        if requests.GET.get('tags', False) or requests.GET.get('orderby', False):
            blogs = blogsModel.custom_post_series(requests)
            # print(blogs)
            return render(requests, 'blog/components/all_blogs.html', {'blogs': blogs})
        else:
            print(False)
        blogs = blogsModel.initial_blogs()
        tags = Tags()
        return render(requests, 'blog/blog.html', {
            'blogs': blogs, 'tags': tags
        })


def detailed_blog(requests, slug):
    post = blogsModel.get_post(slug)
    return render(requests, 'blog/detailed_post.html', {'post': post})


def superelder(requests):
    login = Login()
    blog = Blog()
    return render(requests, 'blog/superelder.html', {
        'login': login, 'blog': blog
    })
