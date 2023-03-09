from google.cloud import vision

def process_image(image_path):
    """
    Processes an image file using the Google Vision API to perform text detection and label detection.

    Args:
        image_path (str): The file path of the image to process.

    Returns:
        tuple: A tuple containing the text annotations and label words as dictionaries.

    Raises:
        FileNotFoundError: If the image file cannot be found.

    Example:
        >>> image_path = 'C:/Users/nasser/Downloads/test.jpg'
        >>> texts, label_words = process_image(image_path)
    """

    # Instantiate the Google Vision client
    client = vision.ImageAnnotatorClient() # Comment it after Reema's code

    try:
        # Read image as binary stream
        with open(image_path, 'rb') as image_file:
            content = image_file.read()
    except FileNotFoundError:
        raise FileNotFoundError("The image file '{}' cannot be found.".format(image_path))

    # Convert the image to the appropriate format for sending to the API
    image = vision.Image(content=content)

    # Call the text detection model and get the results
    text_detection_results = client.text_detection(image=image)
    texts = text_detection_results.text_annotations

    # Call the label detection model and get the results ((list))
    label_detection_results = client.label_detection(image=image)
    labels = label_detection_results.label_annotations

    # Create a dictionary of text words and scores
    text_words = {text.description: text.score for text in texts}

    # Create a dictionary of label words and scores
    label_words = {label.description: label.score for label in labels}

    # Return the text annotations and label words
    return texts, labels