from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from apps.authentication.models import User


class Avatar(models.Model):
    image = models.ImageField(_('image'), upload_to='avatars')
    description = models.CharField(_('description'), max_length=255)
    added_at = models.DateTimeField(_('added at'), default=timezone.now)

    @property
    def image_url(self):
        try:
            image_url = self.image.url
        except ValueError:
            image_url = ''
        return image_url

    class Meta:
        verbose_name = _('avatar')
        verbose_name_plural = _('avatars')

    def __str__(self):
        return f'Avatar {self.id}'


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        unique=True,
        primary_key=True
    )
    avatar = models.ForeignKey(
        Avatar,
        on_delete=models.SET_DEFAULT,
        null=True,
        blank=True,
        default=None,
    )

    def __str__(self):
        return f"{self.user.username}'s profile"


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    """
    Creates profile when new User is created.
    """
    if created:
        Profile.objects.create(
            user=instance
        )
