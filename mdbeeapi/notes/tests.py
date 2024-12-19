import json
import tempfile
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from notes.models import Note, VoiceMemo
from users.models import User


class MDBeeDemoTestNote(TestCase):
    VALID_LOGIN_PAYLOAD = {
        "email": "john@doe.com",
        "password": "Pa$$w0rD!",
    }

    VALID_NOTE_PAYLOAD = {
        "title": "Test title",
        "description": "Test description",
    }

    def setUp(self):
        super().setUp()
        self.audio_file = tempfile.NamedTemporaryFile(suffix=".wav")
        self.VALID_VOICE_MEMO_PAYLOAD = {"voiceMemo": self.audio_file}
        self._create_test_user_accounts()
        self.client.force_login(self.user)
        self.note_url = reverse("notes-list")

    def _create_test_user_accounts(self):
        self.user = User.objects.create_user(**self.VALID_LOGIN_PAYLOAD)
        self.other_user = User.objects.create_user(
            **{
                "email": "tom@doe.com",
                "password": "Pa$$w0rD!",
            }
        )

    def _create_test_note(self):
        return Note.objects.create(
            title=self.VALID_NOTE_PAYLOAD["title"],
            description=self.VALID_NOTE_PAYLOAD["description"],
            owner=self.user,
        )

    def test_create_new_note(self):
        notes_count = Note.objects.count()

        response = self.client.post(
            self.note_url,
            data=json.dumps(self.VALID_NOTE_PAYLOAD),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, response.data)
        new_count = Note.objects.count()
        self.assertEqual(notes_count + 1, new_count)
        self.assertIsNotNone(response.data["id"])

        # Database record created with data from payload
        new_created_note = Note.objects.get(id=response.data["id"])
        self.assertEqual(new_created_note.title, self.VALID_NOTE_PAYLOAD["title"])
        self.assertEqual(
            new_created_note.description, self.VALID_NOTE_PAYLOAD["description"]
        )
        self.assertIsNotNone(new_created_note.created_at)

        # Response with data from payload
        self.assertEqual(response.data["title"], self.VALID_NOTE_PAYLOAD["title"])
        self.assertEqual(
            response.data["description"], self.VALID_NOTE_PAYLOAD["description"]
        )
        self.assertIsNotNone(response.data["created_at"])

    def test_add_voice_memo_to_note(self):
        note = self._create_test_note()
        voice_memo_url = reverse("notes-voice", kwargs={"pk": str(note.id)})
        response = self.client.post(
            voice_memo_url, self.VALID_VOICE_MEMO_PAYLOAD, format="multipart"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, response.data)
        print(response.data)

        new_voice_memo = VoiceMemo.objects.last()

        self.assertEqual(new_voice_memo.note, note)
        self.assertIsNotNone(new_voice_memo.file)

    def test_other_user_do_not_have_access_to_note(self):
        note = self._create_test_note()
        notes_url = reverse("notes-detail", kwargs={"pk": str(note.id)})

        self.client.force_login(self.other_user)
        response = self.client.get(notes_url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND, response.data)
