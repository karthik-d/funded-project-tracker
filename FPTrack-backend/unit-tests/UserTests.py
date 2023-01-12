import unittest 
import requests

def make_user_dict(
    first_name = "Karthik",
    last_name = "D",
    date_of_birth = '1999-09-09',
    email = 'karthik19047@cse.ssn.edu.in',
    role = 'student',
    access = ['user', 'admin', 'resource_mgr']
):
    return dict(
        first_name = first_name,
        last_name = last_name,
        date_of_birth = date_of_birth,
        email = email,
        role = role,
        access = access
    )

class UserTests(unittest.TestCase):

    def test_create_user(self):
        request_body = make_user_dict(first_name="hello", email= "damn@gmail.com")
        
        resp = requests.post(
            'http://localhost:3000/api/user',
            json = request_body
        )

        self.assertEqual(
            resp.json()["message"], 
            "User created"
        )