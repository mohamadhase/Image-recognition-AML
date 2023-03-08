from fastapi import FastAPI,Request
from http import HTTPStatus
import logging

app = FastAPI(
    title="Image Recognition API",
    description="",
    version=0.1
)
logger = logging.getLogger(__name__)
logging.basicConfig(filename='Recognition/logs/ImageRecognition.log',level=logging.DEBUG)


from Recognition.endpoints import api