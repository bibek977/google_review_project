from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-o-yl1*2xt$fdj=q4ulp*w60x#cn+=p4m91nl(l^2zg)-83lt#n'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

# react cors origin 
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

# custom user model
AUTH_USER_MODEL = 'accounts.CustomUser'

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

EXTERNAL_APPS = [
    'corsheaders',
    'rest_framework',
    'show_review',
    'accounts',
    'settings_review'
]

INSTALLED_APPS += EXTERNAL_APPS

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'google_review_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'frontend/dist'],
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

WSGI_APPLICATION = 'google_review_project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DB_DATABASE = os.getenv("DB_DATABASE")
DB_NAME = os.getenv("DB_NAME")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_FOREIGNKEY = True

if DB_DATABASE == "postgres":
    DATABASES = {
        'default' : {
            'ENGINE' : 'django.db.backends.postgresql',
            'NAME' : DB_NAME,
            'USER' : DB_USER,
            'PASSWORD' : DB_PASSWORD,
            'HOST' : DB_HOST,
            'PORT' : DB_PORT
            
        }
    }

else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

# TIME_ZONE = 'UTC'
TIME_ZONE = 'Asia/Kathmandu'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'frontend/dist/']

# MEDIA_URL = 'media/'
# MEDIA_ROOT = BASE_DIR /'media'


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# To make simple json show render
# REST_FRAMEWORK = {
#     'DEFAULT_RENDERER_CLASSES': [
#         'rest_framework.renderers.JSONRenderer',
#     ]
# }

# celery settings 

CELERY_BROKER_URL = 'redis://127.0.0.1:6379/0'
CELERY_TIMEZONE = "Asia/Kathmandu"
# CELERY_TASK_TRACK_STARTED = True
# CELERY_TASK_TIME_LIMIT = 30 * 60

STORAGES = {
    # ...
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}