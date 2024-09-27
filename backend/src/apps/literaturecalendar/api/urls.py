from rest_framework.routers import SimpleRouter
from .views import (
    ArticleViewSet,
    PendingArticleViewSet,
    EventViewSet,
    PendingEventViewSet
)

router = SimpleRouter(trailing_slash=False)
router.register(r'articles', ArticleViewSet)
router.register(r'events', EventViewSet)
router.register(r'pending-articles', PendingArticleViewSet)
router.register(r'pending-events', PendingEventViewSet)

urlpatterns = router.urls
