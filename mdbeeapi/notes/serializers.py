from rest_framework import serializers, validators
from notes.models import Note

class NoteSerializer(serializers.ModelSerializer):
    """
    Serializer responsible for serializing and deserializing user accounts.
    """

    class Meta:
        model = Note
        # Define the fields that this serializer operates on
        fields = "__all__"
        read_only_fields = (
            "id",
            "created_at",
            "owner",
        )
