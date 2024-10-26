from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()


def create(validated_data):
    user = User(**validated_data)
    user.set_password(validated_data['password'])
    user.save()
    return user


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'phone', 'password']
        extra_kwargs = {'password': {'write_only': True}}



class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            # Authenticate user
            user = authenticate(username=email, password=password)
            if user is None:
                raise serializers.ValidationError("Invalid login credentials")
        else:
            raise serializers.ValidationError("Both 'email' and 'password' are required")

        data['user'] = user
        return data