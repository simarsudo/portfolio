from django.urls import path
from . import views

urlpatterns = [
    path("", views.BlogView.as_view(), name='blog'),
    path("superelder/", views.superelder, name='superelder'),
    path("<slug:slug>/", views.detailed_blog, name="detailed_post"),
]
