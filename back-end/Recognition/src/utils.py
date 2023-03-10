from google.cloud import vision
from Recognition import client

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