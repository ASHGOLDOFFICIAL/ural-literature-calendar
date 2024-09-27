from django_filters.rest_framework import FilterSet, filters
from .models import Article, Event


class ArticleFilter(FilterSet):
    month = filters.NumberFilter(label='Month', field_name='date__month', lookup_expr='exact')
    day = filters.NumberFilter(label='Day', field_name='date__day', lookup_expr='exact')

    class Meta:
        model = Article
        fields = ('owner', 'month', 'day')


class EventFilter(FilterSet):
    month = filters.NumberFilter(label='Month', field_name='date__month', lookup_expr='exact')
    day = filters.NumberFilter(label='Day', field_name='date__day', lookup_expr='exact')

    class Meta:
        model = Event
        fields = ('month', 'day')
