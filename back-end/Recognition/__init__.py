from fastapi import FastAPI,Request
from http import HTTPStatus
import logging
app = FastAPI(
    title="Image Recognition API",
    description="",
    version=0.1
)



from Recognition.endpoints import api