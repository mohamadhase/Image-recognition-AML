# Standard library imports
import logging

# Third-party library imports
from fastapi import FastAPI,Request
from http import HTTPStatus
# Local imports
from Recognition.src.classes import GoogleVisionClient
from Recognition.src.constants import CREDENTIALS_PATH
# Set the credentials file path

app = FastAPI(
    title="Image Recognition API",
    description="",
    version=0.1
)
logger = logging.getLogger(__name__)
logging.basicConfig(filename='Recognition/logs/ImageRecognition.log',level=logging.DEBUG)

# Create google vision client instance
client = GoogleVisionClient.get_instance(CREDENTIALS_PATH).google_client
from Recognition.endpoints import api