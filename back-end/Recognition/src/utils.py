# Third-party library imports
from google.cloud import vision # to call Google Vision APIs for image recognition
from google.oauth2.service_account import Credentials # to login to google cloud with the credentials
# Local imports
from Recognition import client
from Recognition import logger


class GoogleVisionClient:
    """
    A singleton class to create and manage a single instance of the Google Vision client.

    Args:
        credentials_path (str): A file path to the credentials file.

    Attributes:
        client (vision.ImageAnnotatorClient): A client to call the Google Vision APIs.

    Raises:
        Exception: If an attempt is made to create a second instance of the class.

    """

    __instance = None

    def __init__(self, credentials_path: str):
        """
        Initializes the GoogleVisionClient class.

        Args:
            credentials_path (str): A file path to the credentials file.

        """
        # Check if a singleton instance already exists
        if GoogleVisionClient.__instance:
            raise Exception("Singleton instance already exists.")
        # Create a new instance of the Google Vision client
        else:
            # Create Credentials object from the information stored in the credentials file
            credentials = Credentials.from_service_account_file(credentials_path)
            # Create a Google Vision client to call the APIs using the credentials
            self.client = vision.ImageAnnotatorClient(credentials=credentials)
            # Save the singleton instance
            GoogleVisionClient.__instance = self

    @staticmethod
    def get_instance(credentials_path: str) -> vision.ImageAnnotatorClient:
        """
        Returns the singleton instance of the Google Vision client.

        Args:
            credentials_path (str): A file path to the credentials file.

        Returns:
            vision.ImageAnnotatorClient: A client to call the Google Vision APIs.

        """
        # If a singleton instance does not exist, create a new one
        if not GoogleVisionClient.__instance:
            GoogleVisionClient(credentials_path)
        # Return the singleton instance
        return GoogleVisionClient.__instance


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
