from rest_framework import viewsets, mixins, status, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from notes.models import Note
from notes.serializers import NoteSerializer

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
