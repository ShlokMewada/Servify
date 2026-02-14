from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField
import pytz
from django.utils import timezone

IST = pytz.timezone('Asia/Kolkata')

def get_ist_time():
    return timezone.now().astimezone(IST)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.TextField(max_length=400, blank=True, null=True)
    is_employee = models.BooleanField(default=False)
    
    def __str__(self):
        return self.user.username

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    image = CloudinaryField('image', blank=True, null=True)

    def __str__(self):
        return self.name

class Service(models.Model):
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = CloudinaryField('image', blank=True, null=True)

    def __str__(self):
        return self.name

class Employee(models.Model):
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, null=True, blank=True)
    service_categories = models.ManyToManyField(ServiceCategory) 
    is_available = models.BooleanField(default=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    is_employee = models.BooleanField(default=False)
    last_booking_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.profile.user.username

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateTimeField(default=get_ist_time)  # IST Time applied here
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('completed', 'Completed')])
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.user.username} - {self.service.name} - {self.status}'

class Review(models.Model):
    service = models.ForeignKey(Service, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return f'Review by {self.user.username} on {self.service.name}'
        
class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order_id = models.CharField(max_length=100, unique=True)
    payment_id = models.CharField(max_length=100, blank=True, null=True)
    signature = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default='INR')
    status = models.CharField(max_length=50, default='Pending')
    created_at = models.DateTimeField(default=get_ist_time)  

    def __str__(self):
        return f"Payment {self.order_id} - {self.status}"
    
class Coupon(models.Model):
    code = models.CharField(max_length=10, unique=True)
    discount = models.DecimalField(max_digits=5, decimal_places=2) 
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.code} ({self.discount}% off)"