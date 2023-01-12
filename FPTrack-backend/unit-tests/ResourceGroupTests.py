
import unittest 
import requests

def make_rsrc_grp_dict(
    name = "Raspberry Pi 3",
    description = "Microcontroller board without WiFi built-in",
    kind ="hardware",
    is_multi_assignable = False
):
    return dict(
        name = name,
        description = description,
        kind = kind,
        is_multi_assignable = is_multi_assignable
    )

class ResourceGroupTests(unittest.TestCase):

    def test_create_resource_group(self):
        request_body = make_rsrc_grp_dict(name= "Raspberry Pi 4")
        
        resp = requests.post(
            'http://localhost:3000/api/resource-group',
            json = request_body
        )

        self.assertEqual(
            resp.json()["message"], 
            "Resource Group created"
        )