from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('api/', include('apps.authentication.api.urls')),
    path('api/', include('apps.profiles.api.urls')),
    path('api/', include('apps.literaturecalendar.api.urls')),
]

admin.site.index_title = 'Ural Literature Calendar'
admin.site.site_header = 'Ural Literature Calendar Administration'
admin.site.site_title = 'Ural Literature Calendar Administration'
