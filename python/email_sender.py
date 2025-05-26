import smtplib
from email.message import EmailMessage
import config

def send_email(to_address, code):
    msg = EmailMessage()
    msg['Subject'] = 'Your Verification Code'
    msg['From'] = config.EMAIL_ADDRESS
    msg['To'] = to_address
    msg.set_content(f"Your verification code is: {code}")

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(config.EMAIL_ADDRESS, config.EMAIL_PASSWORD)
        smtp.send_message(msg)
