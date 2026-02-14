from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import *
from .serializers import *
from .mails import *
import razorpay
import os, json, pytz
from django.utils import timezone
from django.db.models import Min
from django.conf import settings
from django.contrib.auth import get_user_model
from razorpay import Client
import google.generativeai as genai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

User = get_user_model()


class UserProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_object(self):
        user_id = self.kwargs["pk"]
        return UserProfile.objects.get(user__id=user_id)


class ReviewViewSet(viewsets.ModelViewSet):
    permission_classes = [
        AllowAny
    ]  # You might want to use `IsAuthenticated` if only logged-in users can leave reviews
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ServiceCategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer


class ServiceViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class BookingViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class UserSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        username = data.get("username")
        password = data.get("password")
        email = data.get("email")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        address = data.get("address")

        if not username or not password:
            return Response(
                {"error": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email,
                first_name=first_name,
                last_name=last_name,
            )
            UserProfile.objects.create(user=user, address=address, is_employee=False)
        except IntegrityError:
            return Response(
                {"error": "A user with this username already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        send_user_signup_email(user.email, user.username)

        return Response(
            {"message": "User created successfully"}, status=status.HTTP_201_CREATED
        )


class EmployeeSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        username = data.get("username")
        password = data.get("password")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        address = data.get("address")
        service_category_ids = data.get("service_categories")
        is_employee = data.get("is_employee", True)

        if not username or not password or not email or not service_category_ids:
            return Response(
                {
                    "error": "Username, password, email, and service categories are required"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Create User
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name,
        )
        user.save()

        # Create UserProfile
        user_profile = UserProfile.objects.create(
            user=user, address=address, is_employee=is_employee
        )
        user_profile.save()

        # Create Employee
        employee = Employee.objects.create(
            profile=user_profile, address=address, is_available=True
        )

        # Fetch service categories and set them to the employee
        service_categories = ServiceCategory.objects.filter(id__in=service_category_ids)
        if not service_categories.exists():
            return Response(
                {"error": "One or more service categories not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        employee.service_categories.set(service_categories)
        employee.save()
        send_employee_signup_email(user.email, user.username)
        return Response(
            {"message": "Employee created successfully"}, status=status.HTTP_201_CREATED
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.check_password(password):
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response(
                {"error": "User profile does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        employee_id = None
        if user_profile.is_employee:
            try:
                employee = Employee.objects.get(profile=user_profile)
                employee_id = employee.id
            except Employee.DoesNotExist:
                employee_id = None  # In case there's no corresponding Employee record

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user_id": user.id,
                "email": user.email,
                "username": user.username,
                "is_employee": user_profile.is_employee,
                "employee_id": employee_id,
            },
            status=status.HTTP_200_OK,
        )


class HomePageAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        categories = ServiceCategory.objects.all()
        category_data = ServiceCategorySerializer(categories, many=True).data

        response_data = {
            "categories": [
                {"name": category["name"], "image_url": category["image_url"]}
                for category in category_data
            ]
        }
        for category in category_data:
            response_data[category["name"]] = category["services"]

        return Response(response_data)


class PlaceOrderView(APIView):
    def post(self, request):
        user = request.user
        services_data = request.data.get("services")

        if not services_data:
            return Response(
                {"error": "No services provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        created_bookings = []

        for service_data in services_data:
            try:
                service_id = service_data["id"]
                service = Service.objects.get(id=service_id)
                quantity = service_data.get("quantity", 1)

                employee = (
                    Employee.objects.filter(
                        service_categories=service.category, is_available=True
                    )
                    .order_by("last_booking_date")
                    .first()
                )

                if not employee:
                    return Response(
                        {
                            "error": f"No available employee for category {service.category.name}"
                        },
                        status=status.HTTP_404_NOT_FOUND,
                    )

                total_price = service.price * quantity

                booking = Booking.objects.create(
                    user=user,
                    service=service,
                    employee=employee,
                    price=total_price,
                    quantity=quantity,
                    date=timezone.now(),
                    status="pending",
                )

                employee.last_booking_date = timezone.now()
                employee.save()

                created_bookings.append(booking)

                send_order_placed_email(
                    user.email,
                    user.username,
                    service.name,
                    employee.profile.user.username,
                )
                send_employee_order_assigned_email(
                    employee.profile.user.email,
                    employee.profile.user.username,
                    service.name,
                )

            except Service.DoesNotExist:
                return Response(
                    {"error": f"Service with id {service_id} not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            except KeyError:
                return Response(
                    {"error": "Invalid service data format"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(
            BookingSerializer(created_bookings, many=True).data,
            status=status.HTTP_201_CREATED,
        )


class EmployeeDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            employee = Employee.objects.get(profile__user=request.user)

            pending_bookings = Booking.objects.filter(
                employee=employee, status="pending"
            )
            confirmed_bookings = Booking.objects.filter(
                employee=employee, status="confirmed"
            )
            completed_bookings = Booking.objects.filter(
                employee=employee, status="completed"
            )

            pending_data = BookingSerializer(pending_bookings, many=True).data
            confirmed_data = BookingSerializer(confirmed_bookings, many=True).data
            completed_data = BookingSerializer(completed_bookings, many=True).data

            return Response(
                {
                    "pending": pending_data,
                    "confirmed": confirmed_data,
                    "completed": completed_data,
                },
                status=200,
            )

        except Employee.DoesNotExist:
            return Response({"error": "Employee profile not found"}, status=404)


class AcceptOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        try:
            employee = request.user.userprofile.employee
        except Employee.DoesNotExist:
            return Response(
                {"error": "Employee profile not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            booking = Booking.objects.get(id=booking_id, employee=employee)
        except Booking.DoesNotExist:
            return Response(
                {"error": "Booking not found or not assigned to this employee"},
                status=status.HTTP_404_NOT_FOUND,
            )

        if booking.status == "pending":
            booking.status = "confirmed"
            booking.save()

            employee.is_available = False
            employee.save()

            return Response({"message": "Booking accepted"}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Booking is not in pending status"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class MarkOrderCompletedView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        try:
            employee = request.user.userprofile.employee
        except Employee.DoesNotExist:
            return Response(
                {"error": "Employee profile not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            booking = Booking.objects.get(id=booking_id, employee=employee)
        except Booking.DoesNotExist:
            return Response(
                {"error": "Booking not found or not assigned to this employee"},
                status=status.HTTP_404_NOT_FOUND,
            )

        if booking.status == "confirmed":
            booking.status = "completed"
            booking.save()

            employee.is_available = True
            employee.save()

            send_order_completed_email(
                booking.user.email, booking.user.username, booking.service.name
            )

            return Response(
                {"message": "Booking marked as completed"}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"error": "Booking is not in confirmed status"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ServiceCategoryListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = ServiceCategory.objects.all()
        serializer = ServiceCategorySerializer(categories, many=True)

        filtered_data = [
            {"id": category["id"], "service-category": category["name"]}
            for category in serializer.data
        ]

        return Response(filtered_data, status=status.HTTP_200_OK)


client = razorpay.Client(
    auth=(os.getenv("RAZORPAY_API_KEY"), os.getenv("RAZORPAY_API_SECRET"))
)


class PaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            totalPrice = request.data.get("totalPriceWithGST")

            if not totalPrice:
                return Response(
                    {"error": "Total cost is required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            payment_data = {
                "amount": float(totalPrice) * 100,
                "currency": "INR",
                "payment_capture": 1,
            }
            payment_order = client.order.create(data=payment_data)

            payment = Payment.objects.create(
                user=request.user,
                order_id=payment_order["id"],
                amount=totalPrice,
                currency="INR",
                status="Pending",
            )
            return Response(
                {
                    "order_id": payment_order["id"],
                    "amount": payment_data["amount"],
                    "currency": payment_data["currency"],
                    "status": payment.status,
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# class RazorpayWebhook(APIView):

#     def post(self, request, *args, **kwargs):
#         payload = request.body
#         signature = request.headers.get('X-Razorpay-Signature')
#         print(f"Received payload: {payload}")
#         print(f"Received signature: {signature}")

#         # Instantiate Razorpay client
#         client = Client(auth=(os.getenv("RAZORPAY_API_KEY"),os.getenv("RAZORPAY_API_SECRET")))

#         # Verify the signature with Razorpay
#         try:
#             client.utility.verify_webhook_signature(payload,signature)
#             event = json.loads(payload)


#             if event['event'] == 'payment.captured':
#                 order_id = event['payload']['payment']['entity']['order_id']
#                 try:
#                     payment = Payment.objects.get(order_id=order_id)
#                     payment.status = 'Paid'
#                     payment.save()
#                 except Payment.DoesNotExist:
#                     return Response({"error": "Payment not found."}, status=status.HTTP_404_NOT_FOUND)

#             return Response({"status": "success"}, status=status.HTTP_200_OK)

#         except Exception as e:
#             # Log the exception for debugging purposes
#             print(f"Webhook error: {str(e)}")
#             return Response({"error": "Invalid signature."}, status=status.HTTP_400_BAD_REQUEST)


class VerifyPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            # Get payment ID and order ID from the frontend
            razorpay_payment_id = request.data.get("razorpay_payment_id")
            razorpay_order_id = request.data.get("razorpay_order_id")

            if not razorpay_payment_id or not razorpay_order_id:
                return Response(
                    {"error": "Payment ID and Order ID are required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Verify the payment with Razorpay
            try:
                client.payment.fetch(razorpay_payment_id)  # Fetch the payment details
            except razorpay.errors.BadRequestError:
                return Response(
                    {"error": "Invalid payment ID."}, status=status.HTTP_400_BAD_REQUEST
                )

            # Fetch the corresponding Payment record
            try:
                payment = Payment.objects.get(
                    order_id=razorpay_order_id, user=request.user
                )
            except Payment.DoesNotExist:
                return Response(
                    {"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND
                )

            # Update payment status if verified successfully
            payment.status = "Paid"
            payment.save()

            return Response(
                {"message": "Payment verified successfully.", "status": payment.status},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# class ApplyCoupon(APIView):
#     def post(self,request):
#         code=request.data.get('code')
#         totalprice=request.data.get('totalPriceWithGST')
#         if totalprice<100:
#             return Response({"error":"Coupons Cannot Applied for Price less than 100"})
#         try:
#             coupon=Coupon.objects.get(code=code,active=True)
#         except Coupon.DoesNotExist:
#             return Response({"error":"Invalid Coupon"})
#         discount=coupon.discount
#         discount_amount=totalprice*(discount/100)
#         totalprice=totalprice-discount_amount
#         if totalprice<200:
#             return Response({"error":"Coupon Not Valid"})
#         return Response({"message":"Coupon Applied Successfully","discount":discount,'discounted_price':totalprice})


class RejectOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        try:
            # Get the employee making the request
            employee = request.user.userprofile.employee
        except Employee.DoesNotExist:
            return Response(
                {"error": "Employee profile not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            # Fetch the booking
            booking = Booking.objects.get(
                id=booking_id, employee=employee, status="pending"
            )
        except Booking.DoesNotExist:
            return Response(
                {"error": "Booking not found or not assigned to you"},
                status=status.HTTP_404_NOT_FOUND,
            )

        service_category = booking.service.category
        next_employee = (
            Employee.objects.filter(
                service_categories=service_category, is_available=True
            )
            .exclude(id=employee.id)
            .order_by("last_booking_date")
            .first()
        )

        if not next_employee:
            return Response(
                {"error": "No other available employees for this service category"},
                status=status.HTTP_404_NOT_FOUND,
            )

        booking.employee = next_employee
        booking.save()

        next_employee.last_booking_date = timezone.now()
        next_employee.save()

        return Response(
            {
                "message": f"Booking reassigned to {next_employee.profile.user.username}",
                "new_employee": EmployeeSerializer(next_employee).data,
            },
            status=status.HTTP_200_OK,
        )


class UserOrderHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            bookings = Booking.objects.filter(user=user)
            print(bookings)
            serializer = BookingSerializer(bookings, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# 1. Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


# 2. Define the Navigation Tool (Python version)
def open_service(serviceId: int):
    """Navigates to the details page of a specific service."""
    # This function body is just a placeholder; Gemini only needs the definition
    pass


@csrf_exempt
def gemini_chat_view(request):
    if request.method == "POST":
        try:
            # 1. Parse Request
            data = json.loads(request.body)
            user_message = data.get("message")
            # Convert frontend history format to Gemini format if needed, 
            # for now, we'll keep it simple for stability.
            
            # 2. System Instructions (Card-focused)
            system_prompt = """
            You are the "Servify AI Assistant". Your goal is to help users find home services.

            CORE LOGIC:
            - If a user needs a service, identify the correct Service ID(s) from the catalog.
            - Provide a helpful text response followed by a JSON object.
            - The JSON MUST use the key "display_cards" with an array of IDs.

            CATALOG:
            [
              { "id": 43, "name": "Back pain relief massage" },
              { "id": 22, "name": "Move-in Kitchen cleaning" },
              { "id": 42, "name": "Leg pain relief massage" },
              { "id": 78, "name": "Door Lock Repair" },
              { "id": 27, "name": "Cushion Cleaning" },
              { "id": 40, "name": "Hectic day care massage" },
              { "id": 35, "name": "Head Massage" },
              { "id": 31, "name": "Beard Trimming and Styling" },
              { "id": 15, "name": "Basic Cleaning" },
              { "id": 3, "name": "AC Service lite" },
              { "id": 7, "name": "AC uninstall" },
              { "id": 1, "name": "Power Saver AC Service" },
              { "id": 2, "name": "Anti Rust deep Clean Service" },
              { "id": 57, "name": "Wash basin installation" },
              { "id": 70, "name": "Wooden Shelf installation" },
              { "id": 53, "name": "3-Phase changeover switch installation" },
              { "id": 65, "name": "Bed legs/headboard repair" },
              { "id": 68, "name": "Major Door repair" },
              { "id": 4, "name": "AC Repair (Split/Window)" },
              { "id": 5, "name": "Gas leak fix & refill" },
              { "id": 6, "name": "AC install" },
              { "id": 14, "name": "Basic/Wall Mounted Chimmey" },
              { "id": 9, "name": "Single Door CheckUp" },
              { "id": 79, "name": "Fan Repair" },
              { "id": 11, "name": "Side-by-Side door refrigerator" },
              { "id": 13, "name": "Water Purifier Service Check-up" },
              { "id": 16, "name": "Deep Cleaning" }
            ]

            RESPONSE FORMAT EXAMPLE:
            "I can help with that! Here is our specialized service: { \"display_cards\": [43] }"
            """

            # 3. Initialize Model (Tools removed for card-only logic)
            model = genai.GenerativeModel(
                model_name="gemini-flash-latest",
                system_instruction=system_prompt,
            )

            # 4. Generate Response
            chat = model.start_chat(history=[])
            response = chat.send_message(user_message)

            # 5. Return Clean JSON
            return JsonResponse({"text": response.text})

        except Exception as e:
            print(f"ERROR IN CHAT VIEW: {str(e)}")
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid method"}, status=405)