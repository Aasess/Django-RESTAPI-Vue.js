from django.urls import path
#from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('',views.apiOverview,name="API overview"),
    path('todo/',views.TODOView,name="todo"),
    path('todo/<int:pk>',views.TODODetail),
    path('todo/create',views.TODOCreate),
    path('todo/<int:pk>/update',views.TODOUpdate),
    path('todo/<int:pk>/delete',views.TODODelete)
]
