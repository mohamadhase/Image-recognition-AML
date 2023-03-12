# Standard library imports
import logging

# Third-party library imports
from fastapi import FastAPI,Request
from http import HTTPStatus

# Local imports
from src.utils import GoogleVisionClient


# Set the credentials file path
credentials_path = '../back-end/training2-project-948749066640.json'

app = FastAPI(
    title="Image Recognition API",
    description="",
    version=0.1
)
logger = logging.getLogger(__name__)
logging.basicConfig(filename='Recognition/logs/ImageRecognition.log',level=logging.DEBUG)

# Create google vision client instance
client = GoogleVisionClient.get_instance(credentials_path)


from Recognition.endpoints import api