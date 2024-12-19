import base64
from django.db import transaction
from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action
from notes.models import Note, VoiceMemo
from notes.serializers import NoteSerializer, VoiceMemoSerializer

class NoteViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = [IsAuthenticated]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(
            owner=self.request.user
        ).order_by("-created_at")

    def create(self, request):
        """
        Method to create notes - set owner to the Note
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(
                serializer.data, status=status.HTTP_201_CREATED
            )
        else:
            raise ValidationError(serializer.errors)
        
    @action(methods=["post"], detail=True, url_path="voice")
    def voice(self, request, pk):
        note = self.get_object()
        if "voiceMemo" not in request.data:
            raise ValidationError("There is no file in the HTTP body.")
        base64_encoded_data = base64.b64encode(request.data["voiceMemo"].file.read())
        base64_message = base64_encoded_data.decode('utf-8')

        with transaction.atomic():
            vm = VoiceMemo.objects.create(
                note=note,
                file=f'data:audio/wav;base64,{base64_message}'
            )
            vm.save()    
        return Response(
            status=status.HTTP_201_CREATED
        )

class VoiceMemoViewSet(
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet):

    permission_classes = [IsAuthenticated]
    serializer_class = VoiceMemoSerializer

    def get_queryset(self):
        return VoiceMemo.objects.filter(
            note__owner=self.request.user
        )
