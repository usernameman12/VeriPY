from email_sender import send_email
from code_generator import generate_code
from verifier import verify_code
import config

def main():
    email = input("Enter your email address: ")
    code = generate_code()
    send_email(email, code)
    
    print("A verification code has been sent to your email.")
    user_input = input("Enter the 7-digit code: ")

    if verify_code(user_input, code):
        print("Email verified successfully!")
    else:
        print("Incorrect code. Verification failed.")

if __name__ == "__main__":
    main()
