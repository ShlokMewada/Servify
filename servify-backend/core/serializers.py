# core/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    employee_id = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['user', 'address', 'is_employee', 'employee_id']

    def get_user(self, obj):
        return {
            'username': obj.user.username,
            'email': obj.user.email,
            'first_name': obj.user.first_name,
            'last_name': obj.user.last_name,
        }

    def get_employee_id(self, obj):
        if obj.is_employee and hasattr(obj, 'employee'):
            return obj.employee.id
        return None


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'profile']

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, **profile_data)
        return user

class EmployeeSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    service_categories = serializers.SerializerMethodField()
    class Meta:
        model = Employee
        fields = ['profile', 'service_categories', 'is_available', 'address']
    def get_service_categories(self, obj):
        return [{'id': category.id, 'name': category.name} for category in obj.service_categories.all()]

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**profile_data)
        profile = UserProfile.objects.create(user=user, **profile_data)
        employee = Employee.objects.create(profile=profile, **validated_data)
        return employee

class ReviewSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())

    class Meta:
        model = Review
        fields = ['id', 'service', 'user', 'rating', 'comment', 'created_at']

    def get_created_at(self, obj):
        return obj.created_at.strftime('%Y-%m-%d %H:%M:%S')
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['user'] = {
            'id': instance.user.id,
            'username': instance.user.username,
            'first_name':instance.user.first_name,
            'last_name':instance.user.last_name,
        }
        return representation

    def get_created_at(self, obj):
        ist_time = obj.created_at.astimezone(pytz.timezone('Asia/Kolkata'))
        return ist_time.strftime("%Y-%m-%d %H:%M:%S")

class ServiceSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    reviews = ReviewSerializer(many=True, read_only=True)
    
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'price', 'image_url', 'reviews']

    def get_image_url(self, obj):
        return obj.image.url if obj.image else None

class ServiceCategorySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'services', 'image_url']
        
    def get_image_url(self, obj):
        return obj.image.url if obj.image else None

class BookingSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    service_name = serializers.CharField(source='service.name', read_only=True)
    employee_name = serializers.CharField(source='employee.profile.user.username', read_only=True)
    total_amount = serializers.SerializerMethodField()  # For total booking amount

    class Meta:
        model = Booking
        fields = ['id', 'user', 'service' , 'service_name', 'employee_name', 'date', 'status', 'quantity', 'price', 'total_amount']

    def get_date(self, obj):
        # Convert the booking date to IST
        ist_time = obj.date.astimezone(pytz.timezone('Asia/Kolkata'))
        return ist_time.strftime("%Y-%m-%d %H:%M:%S")

    def get_total_amount(self, obj):
        # Calculate total amount by multiplying price by quantity
        return obj.price * obj.quantity


class PaymentSerializers(serializers.ModelSerializer):
    
    class Meta:
        model=Payment
        fields=['user','order_id',' payment_id','signature','amount','currency',' status','created_at']

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['code', 'discount', 'active']