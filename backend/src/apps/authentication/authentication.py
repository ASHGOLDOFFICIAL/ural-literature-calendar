from datetime import datetime
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
import jwt


def create_access_token(id):
    payload = {
        'id': id,
        'exp': datetime.utcnow() + settings.JWT['ACCESS_EXPIRATION_TIME'],
        'iat': datetime.utcnow()
    }
    return jwt.encode(
        payload, settings.JWT['ACCESS_SECRET'],
        algorithm=settings.JWT['ALGORITHM']
    )


def decode_access_token(token):
    try:
        payload = jwt.decode(
            token, settings.JWT['ACCESS_SECRET'],
            algorithms=settings.JWT['ALGORITHM']
        )
        return payload['id']
    except:
        raise AuthenticationFailed()


def create_refresh_token(id):
    payload = {
        'id': id,
        'exp': datetime.utcnow() + settings.JWT['REFRESH_EXPIRATION_TIME'],
        'iat': datetime.utcnow()
    }
    return jwt.encode(
        payload, settings.JWT['REFRESH_SECRET'],
        algorithm=settings.JWT['ALGORITHM']
    )


def decode_refresh_token(token):
    try:
        payload = jwt.decode(
            token, settings.JWT['REFRESH_SECRET'],
            algorithms=settings.JWT['ALGORITHM']
        )
        return payload['id']
    except:
        raise AuthenticationFailed()
