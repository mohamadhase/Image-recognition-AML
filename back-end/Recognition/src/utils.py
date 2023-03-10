# Third-party library imports
from google.cloud import vision # used to call google vision APIs
from google.oauth2.service_account import Credentials # used to login to google cloud with the credentials


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
