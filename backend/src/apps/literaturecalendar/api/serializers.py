from rest_framework import serializers
from ..models import Article, PendingArticle, Event, PendingEvent


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'body', 'image', 'date')


class PendingArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingArticle
        fields = ('id', 'title', 'body', 'image', 'date', 'status')
        read_only_fields = ('status',)


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'date', 'description')


class PendingEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingEvent
        fields = ('id', 'date', 'description', 'status')
        read_only_fields = ('status',)
