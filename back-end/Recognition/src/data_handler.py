from dataclasses import dataclass
import base64
"""
This file could contain CLASSES for data like dataclasses
e.g.
class ClassName:
    att_name: Type = value
"""
@dataclass()
class Photo:
    """ This Class used to Store the Photo come from request as object with content as its properties """
    content:str = None
    def to_bytes(self):
        """ return the content of the photo as bytes """
        return base64.b64decode(self.content.encode('utf-8'))

# Please Note that the ClassName always should be in (PascalCase)
# also the attribute name should always be in (snake_case)