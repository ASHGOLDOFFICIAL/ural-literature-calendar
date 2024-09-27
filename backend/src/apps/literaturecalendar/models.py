from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class Status(models.TextChoices):
    PENDING = 'PE', _('Pending')
    APPROVED = 'AP', _('Approved')
    REJECTED = 'RE', _('Rejected')


class Article(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=250)
    body = models.TextField(max_length=10000)
    image = models.ImageField(null=True, blank=True)
    date = models.DateField()
    added_at = models.DateTimeField(default=timezone.now)

    @property
    def image_url(self):
        try:
            image_url = self.image.url
        except ValueError:
            image_url = ''
        return image_url

    def __str__(self):
        return f'{self.date} — {self.title}'


class PendingArticle(Article):
    status = models.CharField(max_length=2, choices=Status.choices, default=Status.PENDING)


class Event(models.Model):
    suggested_by = models.ForeignKey(settings.AUTH_USER_MODEL,
                                     on_delete=models.SET_NULL, null=True)
    date = models.DateField()
    description = models.CharField(max_length=1000)

    def __str__(self):
        return f'{self.date} — {self.description}'


class PendingEvent(Event):
    status = models.CharField(max_length=2, choices=Status.choices, default=Status.PENDING)
