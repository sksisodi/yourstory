from django.urls import path
from . import views

urlpatterns = [
    path('api/generate-story/', views.generate_story, name='generate_story'),
]
