from django.urls import path
from students.views import student_lists
urlpatterns = [path("", student_lists, name="student-lists")]
