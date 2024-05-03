from django.urls import path
from .views import issues_view, home


urlpatterns = [
    path('', home, name='home'),
    path('api/issues/', issues_view, name='issues-api'),
]