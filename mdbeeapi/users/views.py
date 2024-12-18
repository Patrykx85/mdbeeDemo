from rest_framework import viewsets, mixins, status, exceptions
from rest_framework.response import Response

from users.serializers import UserSerializer
from users.models import User

class UserViewSet(
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    """
    A viewset for managing user accounts.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            try:
                user = User.objects.get(email=email)
                raise exceptions.ValidationError({"email": "Email address already taken."})

            except User.DoesNotExist:
                user = serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
