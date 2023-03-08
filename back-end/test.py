from google.cloud import vision # used to call google vision APIs
from google.oauth2.service_account import Credentials # used to login to google cloud with the credentials
from PIL import Image, ImageDraw # to draw the picture and the boundires (not important)
from wordcloud import WordCloud # to draw the word cloud (not important)

# create Credentials object from my information stored in the cridentials file
credentials = Credentials.from_service_account_file('C:/Users/nasser/Desktop/Image-recognition-AML/back-end/training2-project-948749066640.json')
# Create google vision client to call the APIs using the credentials
client = vision.ImageAnnotatorClient(credentials=credentials)

# Loads the image as binary stream
with open('C:/Users/nasser/Downloads/test.jpg', 'rb') as image_file:
    content = image_file.read()
# convert the image from bytes to image type from google to be able to send it throw functions
image = vision.Image(content=content)
# call the model that performe text detection and get the results
response1 = client.text_detection(image=image)
# call the model that performe label detection and get the results
response2 = client.label_detection(image=image)
# get the results
texts = response1.text_annotations
#get the results
labels = response2.label_annotations
# the rest not neccassary just to show :) 
label_words = {label.description: label.score for label in labels}

