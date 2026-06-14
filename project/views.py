from django.shortcuts import *

def homePage(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def mix_your_drinks(request):
    return render(request, "mix-your-drinks.html")