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
    approved_on = None,
    rejected_on = None,
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
        budget = budget,
        approved_on = approved_on,
        rejected_on = rejected_on
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

    def test_leader_is_not_in_members(self):
        request_body = make_proposal_dict(leader="ben@gmail.com", members = ['ben@gmail.com', 'claire@gmail.com'])
        
        resp = requests.post(
            'http://localhost:3000/api/proposal',
            json = request_body
        )

        self.assertEqual(
            resp.json()["message"], 
            "proposal validation failed: members: Duplicate entry for leader found in members list. Mention only once"
        )

    def test_approved_dates_rejected_dates_both_not_null(self):
        request_body = make_proposal_dict(approved_on = "2020-12-12",rejected_on = "2020-12-14")
        
        resp = requests.post(
            'http://localhost:3000/api/proposal',
            json = request_body
        )

        self.assertEqual(
            resp.json()["message"], 
            "proposal validation failed: rejected_on: Either rejected or approved date should be mentioned but not both!"
        )
    
