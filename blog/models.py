import firebase_admin
from firebase_admin import credentials, firestore


cred = credentials.Certificate("google_key.json")
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
        self.collection = 'blog'
        self.filter = u'datetime'
        self.limit = 5
        self.cursor = None

    def to_list(self, data):
        blogs = []
        for blog in data:
            blogs.append(blog.to_dict())
        return blogs

    def initial_blogs(self):
        query = db.collection(self.collection).order_by(
            self.filter, direction=firestore.Query.DESCENDING).limit(self.limit)
        blogs = query.get()
        self.cursor = list(blogs)[-1]
        self.cursor = self.cursor.to_dict()[self.filter]
        blogs = self.to_list(blogs)
        return blogs

    def next_blogs(self):
        query = db.collection(self.collection).order_by(
            self.filter).start_after({self.filter: self.cursor}).limit(self.limit)
        blogs = query.get()
        try:
            self.cursor = list(blogs)[-1]
        except IndexError:
            return False
        self.cursor = self.cursor.to_dict()[self.filter]
        blogs = self.to_list(blogs)
        if len(blogs) > 0:
            return blogs
        return False

    def get_post(self, slug):
        return db.collection('blog').document(slug).get().to_dict()

    def custom_post_series(self, request):
        tags = request.GET.get('tags', False)
        orderby = request.GET.get('orderby', False)
        tags = list(tags.split(","))
        query = ''

        if tags:
            query = db.collection(self.collection).order_by(
                self.filter, direction=firestore.Query.DESCENDING if orderby == 'Descending' else firestore.Query.ASCENDING).where(
                u'tags', u'array_contains_any', tags
            ).limit(self.limit)
        else:
            query = db.collection(self.collection).order_by(
                self.filter, direction=firestore.Query.DESCENDING if orderby == 'Descending' else firestore.Query.ASCENDING).limit(
                    self.limit)
        blogs = query.get()
        blogs = self.to_list(blogs)
        return blogs


blogsModel = BlogsModel()
