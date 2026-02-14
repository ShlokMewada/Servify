from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import *

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'image_tag')  

    def image_tag(self, obj):
        return obj.image.url if obj.image else 'No image'
    image_tag.short_description = 'Image'

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'image_tag') 

    def image_tag(self, obj):
        return obj.image.url if obj.image else 'No image'
    image_tag.short_description = 'Image' 

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'address', 'is_employee')
    search_fields = ('user__username', 'address')
@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('profile', 'is_available')
    list_filter = ('is_available',)
    search_fields = ('profile__user__username',)


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'service', 'employee', 'date', 'status')
    list_filter = ('status', 'date')
    search_fields = ('user__username', 'service__name', 'employee__profile__user__username')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('service', 'user', 'rating', 'comment', 'created_at')  # Fields to display in the admin list view
    search_fields = ('service__name', 'user__username', 'comment')  # Enable search functionality
    list_filter = ('rating', 'created_at')

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display=('user','amount')

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('code', 'discount', 'active')
