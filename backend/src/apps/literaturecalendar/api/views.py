
from rest_framework.viewsets import ModelViewSet
from .serializers import ArticleSerializer, PendingArticleSerializer, EventSerializer, PendingEventSerializer
from ..filters import ArticleFilter, EventFilter
from ..models import Article, Event, PendingArticle, PendingEvent


class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    filterset_class = ArticleFilter


class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filterset_class = EventFilter


class PendingArticleViewSet(ModelViewSet):
    queryset = PendingArticle.objects.all()
    model = PendingArticle
    serializer_class = PendingArticleSerializer


class PendingEventViewSet(ModelViewSet):
    queryset = PendingEvent.objects.all()
    model = PendingEvent
    serializer_class = PendingEventSerializer
