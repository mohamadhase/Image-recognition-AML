from http import HTTPStatus
from fastapi import Request,File,HTTPException
from Recognition import app,logger
from Recognition.src.data_handler import Photo
from Recognition.src.utils import google_vision_call,convert_text_to_dict,convert_labels_to_dict

@app.get("/health")
def _health_check(request:Request)->dict:
    """Health check"""
    logger.info("Health check")
    response = {
        "message":HTTPStatus.OK.phrase,
        "status-code":HTTPStatus.OK,
        "data":{}
    }
    logger.info(f"Health check Status-code :{HTTPStatus.OK} ")
    return response

@app.post("/recognition")
def _recognize_photo(photo:Photo):
    logger.info("Received a photo for recognition.")
    
    photo_bytes = photo.to_bytes()
    texts,labels = google_vision_call(photo=photo_bytes)
    
    logger.debug(f"Recognized texts: {texts}")
    logger.debug(f"Recognized labels: {labels}")
    
    texts_dict = convert_text_to_dict(texts=texts) # convert the text object to dict
    labels_dict = convert_labels_to_dict(labels=labels) # convert the text object to dict
    
    logger.debug(f"Converted texts to dict: {texts_dict}")
    logger.debug(f"Converted labels to dict: {labels_dict}")
    
    response = {
        "message": HTTPStatus.OK.phrase,
        "status-code": HTTPStatus.OK,
        "data": {"labels_response": labels_dict, "text_response": texts_dict},
    }
    
    logger.info("Recognition completed successfully.")
    
    return response
    
    
