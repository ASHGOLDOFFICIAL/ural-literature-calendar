from datetime import timedelta
from pathlib import Path
from corsheaders.defaults import default_headers


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-(n2@_vcw4o0tdq^t+w2(n*0&zr41nc!snqhc^j26=1nyxf1fgm'

DEBUG = True
ALLOWED_HOSTS = [
    '.localhost', '0.0.0.0', '127.0.0.1', '[::1]',
    '192.168.0.38', '192.168.0.105', '192.168.43.137'
]

CSRF_TRUSTED_ORIGINS = [
    'http://192.168.0.38:3000', 'http://192.168.0.105:3000']


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'apps.authentication.apps.AuthenticationConfig',
    'apps.profiles.apps.ProfilesConfig',
    'apps.literaturecalendar.apps.LiteratureCalendarConfig',

    'django_filters',
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'ural_literature_calendar',
        'USER': 'ural_literature_calendar',
        'PASSWORD': 'vW6%88wgbA6TZ*rZ',
        'HOST': 'database',
        'PORT': 5432
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_USER_MODEL = 'authentication.User'
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_ROOT = BASE_DIR / 'static'
STATIC_URL = 'static/'
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_URL = 'media/'


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
APPEND_SLASH = False


# Django Rest Framework settings

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    )
}


# Django CORS headers settings

CORS_ALLOWED_ORIGIN_REGEXES = [
    r'^http://localhost:\d+$',
    r'^http://192\.168\.\d+\.\d+:\d+$',
    r'^192\.168\.0\.\d+:\d+$',
]
CORS_ALLOW_METHODS = [
    'DELETE', 'GET', 'OPTIONS',
    'PATCH', 'POST', 'PUT',
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = list(default_headers) + ['Set-Cookie']


# PyJWT auth
JWT = {
    'ALGORITHM': 'HS256',
    'HTTPONLY': True,
    'SAMESITE': 'Strict',
    'SECURE': False,

    'ACCESS_TOKEN_NAME': 'accessToken',
    'ACCESS_EXPIRATION_TIME': timedelta(minutes=1),
    'ACCESS_SECRET': 'dzmboe262z441(t)f!ur=9_+r42^)3+bwt9aenn^23p9^_&vw0',

    'REFRESH_TOKEN_NAME': 'refreshToken',
    'REFRESH_EXPIRATION_TIME': timedelta(days=7),
    'REFRESH_SECRET': '3*f&xbf6y4i+##ana#t)4uek)9^u(ucrvj4dm364_l5m!iv#yq'
}
