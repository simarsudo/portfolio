from glob import escape
from django.conf import settings
import firebase_admin
from firebase_admin import credentials, firestore
from dateutil.parser import isoparse
import os
from django.conf import settings
from json import loads

if settings.DEBUG:
    cred = credentials.Certificate("google_key.json")
else:
    cred = credentials.ApplicationDefault()

firebase_admin.initialize_app(cred)

db = firestore.client()


def get_tags():
    tags_dict = db.collection('tags').document('tags').get()
    tags_dict = tags_dict.to_dict()
    tags_list = []
    for key, value in tags_dict.items():
        tags_list.append((key, value))
    return tags_list


class BlogsModel:
    def __init__(self) -> None:
        self.collection = u'blog'
        self.filter = u'datetime'
        self.limit = 6

    def to_list(self, data):
        blogs = []
        for blog in data:
            blogs.append(blog.to_dict())
        return blogs

    def initial_blogs(self):
        query = db.collection(self.collection).order_by(
            self.filter, direction=firestore.Query.DESCENDING).limit(self.limit)
        blogs = query.get()
        blogs = self.to_list(blogs)
        return blogs

    def next_blogs(self, request,):
        tags = request.GET.get('tags', False)
        orderby = request.GET.get('orderby', False)
        orderby = firestore.Query.ASCENDING if orderby == 'Ascending' else firestore.Query.DESCENDING
        orderby_test = request.GET.get('orderby', False)
        dt = request.GET.get('datetime', False)
        dt = isoparse(dt)
        dt_filter = u'>' if orderby_test == 'Ascending' else u'<'
        tags = list(tags.split(","))
        query = ''

        if tags and len(tags[0]) > 0:
            query = db.collection(self.collection).order_by(self.filter, direction=orderby).where(
                u'tags', u'array_contains_any', tags).where(
                self.filter, dt_filter, dt
            ).limit(self.limit)
        else:
            query = db.collection(self.collection).order_by(self.filter, direction=orderby).where(
                self.filter, dt_filter, dt
            ).limit(self.limit)
        blogs = query.get()
        blogs = self.to_list(blogs)
        return blogs

    def get_post(self, slug):
        return db.collection('blog').document(slug).get().to_dict()

    def custom_post_series(self, request):
        tags = request.GET.get('tags', False)
        orderby = request.GET.get('orderby', False)
        orderby = firestore.Query.ASCENDING if orderby == 'Ascending' else firestore.Query.DESCENDING
        tags = list(tags.split(","))
        query = ''

        if tags and len(tags[0]) > 0:
            query = db.collection(self.collection).order_by(
                self.filter, direction=orderby).where(
                u'tags', u'array_contains_any', tags
            ).limit(self.limit)
        else:
            query = db.collection(self.collection).order_by(
                self.filter, direction=orderby).limit(
                    self.limit)
        blogs = query.get()
        blogs = self.to_list(blogs)
        return blogs


blogsModel = BlogsModel()
