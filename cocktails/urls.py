from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("", views.cocktails_list, name="cocktails"),
    path("users_cocktails/", views.user_cocktails, name="users_cocktails"),
    path("create/", views.create_cocktail, name="create_cocktail"),
    path(
        "users_favourite_cocktails/",
        views.starred_cocktails,
        name="users_favourite_cocktails",
    ),
    path("<int:pk>/edit/", views.edit_cocktail, name="edit_cocktail"),
    path("<int:pk>/delete/", views.delete_cocktail, name="delete_cocktail"),
    path("<int:pk>/toggle-star/", views.toggle_star, name="toggle-star"),
    path("ingredients/", views.ingredients_list, name="ingredients_list"),
    path("<int:pk>/", views.cocktail_details, name="cocktail_details"),
    path("ingredients/<int:pk>/edit/", views.edit_ingredient, name="edit_ingredient"),
    path(
        "ingredients/<int:pk>/delete/",
        views.delete_ingredient,
        name="delete_ingredient",
    ),
    path("ingredients/create/", views.create_ingredient, name="create_ingredient"),
    path("export/excel/", views.export_cocktails_to_excel, name="export_excel"),
]
