from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from .models import Avatar, Profile


@admin.register(Avatar)
class AvatarAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('image', 'description')
        }),
        (_('Avatar'), {
            'fields': ('avatar',)
        }),
    )
    list_display = ('avatar', 'description')
    readonly_fields = ('added_at', 'avatar')

    def avatar(self, obj):
        return format_html(
            f'<img src="{obj.image.url}" style="max-height:10rem;"/>'
        )


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('user',)
        }),
        (_('Customization'), {
            'fields': ('avatar',)
        }),
    )


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
