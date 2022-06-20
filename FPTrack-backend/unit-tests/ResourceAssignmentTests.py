import unittest 
import requests

def make_rsrc_assign_dict(
    resource = "628abd6b4bc531d7264a0aac",
    assigned_to = "62a75c49f520a093bf1218a8",
    assigned_by = "628f1954f5b6a7772b9885b0"
):
    return dict(
        resource = resource,
        assigned_to = assigned_to,
        assigned_by = assigned_by
    )

class ResourceAssignmentTests(unittest.TestCase):

    def test_resource_is_only_for_internally_funded_projects(self):
        request_body = make_rsrc_assign_dict(assigned_to="62a7fc7868284702fa63663e")
        
        resp = requests.post(
            'http://localhost:3000/api/resource-assignment',
            json = request_body
        )

        self.assertEqual(
            resp.json()["message"], 
            "resource_assignment validation failed: assigned_to: The given project is not a internal"
        )

    def test_assigned_by_is_a_resource_manager(self):
        request_body = make_rsrc_assign_dict(assigned_by="628c92ae71aff5fc3cf6ee60")
        
        resp = requests.post(
            'http://localhost:3000/api/resource-assignment',
            json = request_body
        )

        self.assertEqual(
            resp.json()["message"], 
            "resource_assignment validation failed: assigned_by: The user is not a resource manager"
        )

    
    
