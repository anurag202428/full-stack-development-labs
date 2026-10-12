from django.shortcuts import render
def student_lists(request):
    students = [
        {"name": "Anurag Parmar", "course": "B.Tech CSE", "year": 3},
        {"name": "Riya Sharma", "course": "B.Tech CSE", "year": 3},
        {"name": "Karan Singh", "course": "B.Tech ECE", "year": 2},
        {"name": "Meera Joshi", "course": "B.Tech CSE", "year": 3},
    ]
    return render(request, "students/student_lists.html", {"students": students})
