import unittest 
import requests

def make_proposal_dict(
    title="this is title",
    description="this is description",
    domains=["machine_learning"],
    supervisors=["greg@gmail.com"],
    leader="ben@gmail.com",
    members = ['greg@gmail.com', 'claire@gmail.com'],
    funding_type = 'external',
    funding_agency = 'DST-SERB',
    pdf_document = "abcd",
    budget = 50000
):
    return dict(
        title = title,
        decription = description,
        domains = domains,
        supervisors = supervisors,
        leader = leader,
        members = members,
        funding_type = funding_type,
        funding_agency = funding_agency,
        pdf_document = pdf_document,
        budget = budget
    )

class ProposalTests(unittest.TestCase):

    def test_supervisor_is_faculty(self):
        request_body = make_proposal_dict(supervisors=["ben@gmail.com"])
        
        resp = requests.post(
            'http://localhost:3000/api/proposal',
            json = request_body
        )

        self.assertEqual(
            resp.json()["message"], 
            "proposal validation failed: supervisors: All supervisors must be faculty"
        )
