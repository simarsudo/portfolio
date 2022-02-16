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


def detailed_blog(requests, slug):
    post = blogsModel.get_post(slug)
    return render(requests, 'blog/detailed_post.html',{'post': post})


def superelder(requests):
    login = Login()
    blog = Blog()
    return render(requests, 'blog/superelder.html', {
        'login': login, 'blog': blog
    })
