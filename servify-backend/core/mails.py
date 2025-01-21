from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponse
import threading


def send_email(subject, message, recipient_list):
    def email_task():
        send_mail(
            subject=subject,
            message=message,
            from_email='servify.notifications@gmail.com',
            recipient_list=recipient_list,
        )
    
    # Create and start the thread
    thread = threading.Thread(target=email_task)
    thread.start()

def send_user_signup_email(user_email, username):
    subject = "Welcome to Servify!"
    message = f"Dear {username},\n\nWelcome to Servify! We are excited to have you with us. You can now explore and book services at your convenience.\n\nBest regards,\nThe Servify Team"
    
    send_email(subject, message, [user_email])

def send_employee_signup_email(employee_email, username):
    subject = "Welcome to Servify as an Employee!"
    message = f"Dear {username},\n\nWelcome to the Servify Team! We are thrilled to have you onboard. You can now start accepting service bookings.\n\nBest regards,\nThe Servify Team"
    
    send_email(subject, message, [employee_email])


def send_order_placed_email(user_email, username, service_name, employee_name):
    subject = "Your Servify Order is Placed!"
    message = f"Dear {username},\n\nYour order for the service '{service_name}' has been successfully placed. {employee_name} will be handling your request.\n\nBest regards,\nThe Servify Team"
    
    send_email(subject, message, [user_email])

def send_employee_order_assigned_email(employee_email, employee_name, service_name):
    subject = "New Service Assigned to You!"
    message = f"Dear {employee_name},\n\nYou have been assigned a new service request for '{service_name}'. Please check your dashboard for details.\n\nBest regards,\nThe Servify Team"
    
    send_email(subject, message, [employee_email])

def send_order_completed_email(user_email, username, service_name):
    subject = "Your Servify Order is Completed!"
    message = f"Dear {username},\n\nWe are pleased to inform you that your order for the service '{service_name}' has been successfully completed.\n\nBest regards,\nThe Servify Team"
    
    send_email(subject, message, [user_email])
