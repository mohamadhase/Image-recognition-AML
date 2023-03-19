# Standard library imports
import logging

# Third-party library imports
from fastapi import FastAPI,Request
from http import HTTPStatus

# Local imports
from Recognition.src.classes import GoogleVisionClient
from Recognition.src.constants import CREDENTIALS_PATH
from fastapi.middleware.cors import CORSMiddleware
import serial
import time
# Set the credentials file path

app = FastAPI(
    title="Image Recognition API",
    description="",
    version=0.1
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change this to the origin(s) you want to allow
    allow_credentials=True,
    allow_methods=["*"], # Change this to the HTTP method(s) you want to allow
    allow_headers=["*"], # Change this to the header(s) you want to allow
)
logger = logging.getLogger(__name__)
logging.basicConfig(filename='Recognition/logs/ImageRecognition.log',level=logging.DEBUG)

# Create google vision client instance
client = GoogleVisionClient.get_instance(CREDENTIALS_PATH).google_client
ser = None
try:
    ser =  serial.Serial("COM4", 9600)
except :
    print("no arduino connected to the device")


from Recognition.endpoints import api