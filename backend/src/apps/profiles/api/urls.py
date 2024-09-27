from rest_framework.routers import SimpleRouter
from .views import (
    AvatarViewSet,
    ProfileViewSet
)

router = SimpleRouter(trailing_slash=False)
router.register(r'avatars', AvatarViewSet)
router.register(r'profiles', ProfileViewSet)

urlpatterns = router.urls
