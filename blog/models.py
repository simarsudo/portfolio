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
