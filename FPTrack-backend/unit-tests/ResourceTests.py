import unittest 
import requests

def make_resource_dict(
    resource_group = "628abd6b4bc531d7264a0aaa",
    remarks = "Microcontroller board without WiFi built-in",
    scan_code = "XXXX123456"
):
    return dict(
        resource_group = resource_group,
        remarks = remarks,
        scan_code = scan_code
    )

class ResourceTests(unittest.TestCase):

    def test_create_resource(self):
        request_body = make_resource_dict(remarks = "damn,,,", scan_code="2344XXX")
        
        resp = requests.post(
            'http://localhost:3000/api/resource',
            json = request_body
        )

        self.assertEqual(
            resp.json()["message"], 
            "Resource created"
        )