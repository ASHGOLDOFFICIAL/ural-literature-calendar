from django.contrib.auth.forms import UserCreationForm as UserCreationForm
from .models import User


class UserCreationForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super(UserCreationForm, self).__init__(*args, **kwargs)
        self.fields['email'].help_text = 'Required.'

    class Meta:
        model = User
        exclude = ('',)
