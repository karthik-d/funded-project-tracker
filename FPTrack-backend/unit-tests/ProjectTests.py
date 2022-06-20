import unittest 
import requests

def make_project_dict(
    proposal ="628b5425099b1ba80b543da6",
    approved_budget = 12000,
    approved_duration = 18,
):
    return dict(
        proposal = proposal,
        approved_budget = approved_budget,
        approved_duration = approved_duration,
    )


def update_project_dict(
        id ="62a4e23619d791faaf76e19a",
        title = "Patent submitted",
        description = "Fully approved design patent made",
        kind = "patent",
        reference = "www.patents.com/aaa123"
    ):
    return dict(
        id = id,
        title = title,
        description = description,
        kind = kind,
        reference = reference
    )

class ProjectTests(unittest.TestCase):

    def test_create_a_project(self):
        request_body = make_project_dict()
        
        resp = requests.post(
            'http://localhost:3000/api/project',
            json = request_body
        )

        self.assertEqual(
            resp.json()["message"], 
            "Project created. Proposal updated"
        )


    def test_update_a_project(self):
        request_body = update_project_dict(id = "62a75c49f520a093bf1218a8")

        resp = requests.patch(
            'http://localhost:3000/api/project/update-status',
            json = request_body
        )

        self.assertEqual(
            resp.status_code,
            204
        )

    
    
