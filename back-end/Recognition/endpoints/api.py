from Recognition import app
from http import HTTPStatus
from fastapi import Request

@app.get("/health")
def _health_check(request:Request)->dict:
    """Health check"""
    response = {
        "message":HTTPStatus.OK.phrase,
        "status-code":HTTPStatus.OK,
        "data":{}
    }
    return response