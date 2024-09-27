from django.contrib import admin
from .models import (
    Article,
    PendingArticle,
    Event,
    PendingEvent
)


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'date', 'added_at')


@admin.register(PendingArticle)
class PendingArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'owner', 'date', 'added_at')


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('description', 'date', 'suggested_by',)


@admin.register(PendingEvent)
class PendingEventAdmin(admin.ModelAdmin):
    list_display = ('description', 'date', 'status', 'suggested_by',)
