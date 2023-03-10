from google.cloud import vision
from Recognition import client
from Recognition import logger

def google_vision_call(photo:bytes):
    """
    Processes an image file using the Google Vision API to perform text detection and label detection.

    Args:
        photo type bytes.

    Returns:
        tuple: A tuple containing the text annotations and label words.

    """
    # Convert the image to the appropriate format for sending to the API
    image = vision.Image(content=photo)

    # Call the text detection model and get the results
    text_detection_results = client.text_detection(image=image)
    texts = text_detection_results.text_annotations

    # Call the label detection model and get the results ((list))
    label_detection_results = client.label_detection(image=image)
    labels = label_detection_results.label_annotations

    # Return the text annotations and label words
    return texts, labels

def convert_text_to_dict(texts)->list[dict]:
    """
    Convert the text Object comes from google vision api to pure dict in python
    Args:
        texts : the text as its come from google vision APIs

    Returns:
        list[dict]: the same information structured in list of dicts
    """
    logger.info("Converting text to dict.")

    texts = texts[1:] # remove the summary cell which is indexed 0 
    texts_dict = [] # init the dictionary result
    for text in texts:
        bounding_poly_vertices = [
            {'x': vertex.x, 'y': vertex.y}
            for vertex in text.bounding_poly.vertices
        ] # convert the poly vertices to array of dicts
        text_dict = { 
            'description': text.description,
            'bounding_poly': bounding_poly_vertices,
            'confidence': text.confidence
        } # map the values into keys
        texts_dict.append(text_dict)
    logger.debug(f"Texts dict: {texts_dict}")

    return texts_dict

def convert_labels_to_dict(labels)->dict:
    """
    Convert the labels Object comes from google vision api to pure dict in python
    Args:
        labels : the labels as its come from google vision APIs

    Returns:
        dict: the same information structured in dict type
    """
    logger.info("Converting labels to dict.")

    labels_dict = {
        "labels": [label.description for label in labels],
        "scores": [label.score for label in labels],
    }
    logger.debug(f"Labels dict: {labels_dict}")

    return labels_dict
