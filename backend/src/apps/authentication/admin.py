from django.contrib import admin
from django.contrib.auth.admin import (
    UserAdmin as BaseUserAdmin,
    GroupAdmin as BaseGroupAdmin
)
from django.contrib.auth.models import Group as DefaultGroup
from django.utils.translation import gettext_lazy as _
from apps.profiles.admin import ProfileInline
from .models import User, Group
from .forms import UserCreationForm


@admin.register(User)
class UserAccountAdmin(BaseUserAdmin):
    add_form_template = 'admin/accounts/user_account/add_form.html'
    fieldsets = (
        (None, {
            'fields': ('username', 'email', 'password')
        }),
        (_('Personal info'), {
            'fields': ('first_name', 'last_name', 'birthdate')
        }),
        (_('Permissions'), {
            'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
                'groups',
                'user_permissions',
            ),
        },),
        (_('Important dates'), {
            'fields': ('last_login', 'date_joined')
        }),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        },),
    )
    add_form = UserCreationForm
    list_display = ('username', 'email', 'date_joined', 'is_active')
    readonly_fields = ('date_joined', 'last_login')
    inlines = (ProfileInline, )


@admin.register(Group)
class GroupAdmin(BaseGroupAdmin):
    pass


admin.site.unregister(DefaultGroup)
