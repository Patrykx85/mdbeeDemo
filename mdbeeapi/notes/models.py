import uuid
from django.db import models
from users.models import User

class Note(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    description = models.TextField()


class VoiceMemo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    note = models.ForeignKey(Note, related_name="voicememos", on_delete=models.CASCADE)
    file = models.TextField(blank=True, null=True)
