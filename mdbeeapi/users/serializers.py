from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer responsible for serializing and deserializing user accounts.
    """

    class Meta:
        model = User
        # Define the fields that this serializer operates on
        fields = (
            "id",
            "email",
            "password",
        )
        # Ensure that the password is not being returned in responses
        extra_kwargs = {"password": {"write_only": True}}
        read_only_fields = (
            "id",
        )

    email = serializers.EmailField()

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user
