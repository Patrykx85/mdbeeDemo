from rest_framework import serializers, validators
from notes.models import Note, VoiceMemo

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
            "voice_memos",
        )
    
    voice_memos = serializers.SerializerMethodField()

    def get_voice_memos(self, instance: Note):
        return [voicememo.id for voicememo in instance.voicememos.all()]


class VoiceMemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceMemo
        fields = ["id", "file", "note"]
        read_only_fields = ["id"]
