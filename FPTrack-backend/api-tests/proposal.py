import requests
import base64
import os
import json

sample_pdf_path = os.path.join(os.getcwd(), *((os.path.pardir,)*1), 'check_files', 'agg_doc.pdf')
destn_pdf_path = os.path.join(os.getcwd(), *((os.path.pardir,)*1), 'check_files', 'retreive_doc.pdf')

def encode_pdf(filepath):
    pdf_doc_b64_bytes = base64.b64encode(open(filepath, 'rb').read())
    pdf_doc_b64_string = pdf_doc_b64_bytes.decode('utf-8')
    return pdf_doc_b64_string

def save_pdf(filedata, filepath):
    byte_data = decode_pdf(filedata)
    with open(filepath, 'wb') as f_out:
        f_out.write(byte_data)


def decode_pdf(byte_list):
    return base64.b64decode(''.join([chr(ascii) for ascii in byte_list]))


def post(debug=True):

    pdf_doc_b64_string = encode_pdf(sample_pdf_path)

    # req_body = dict(
    #     title = "IoT Driven Smart Trains",
    #     decription = "blah blah blah...",
    #     domains = ['iot', 'machine_learning'],
    #     supervisors = ['admin@admin.com', 'test@admin.com'],
    #     leader = 'ben@gmail.com',
    #     members = ['claire@gmail.com', 'derek@gmail.com'],
    #     funding_type = 'internal',
    #     funding_agency = 'SSN Trust',
    #     pdf_document = pdf_doc_b64_string,
    #     budget = 10000
    # )
    req_body = dict(
        title = "Number Plate Detection, Again",
        decription = "Blah blah blah...blah..",
        domains = ['machine_learning'],
        supervisors = ['sarabesh2001@gmail.com'],
        leader = 'ben@gmail.com',
        members = ['erin@gmail.com', 'greg@gmail.com'],
        funding_type = 'internal',
        funding_agency = 'SSN Trust',
        pdf_document = pdf_doc_b64_string,
        approved_on = "2020-12-12",
        rejected_on = "2020-12-14",
        budget = 50000
    )
    resp = requests.post(
        'http://localhost:3000/api/proposal',
        json = req_body
    )

    # print(resp.text)    
    print(resp.status_code)
    if not debug:
        resp = resp.json()[0]
        print(resp.keys())
        resp.pop('pdf_document')
        print(resp)


def get(id=None, debug=True):
    if id is None:
        resp = requests.get(
            'http://localhost:3000/api/proposal'
        )
    else:
        resp = requests.get(
            f'http://localhost:3000/api/proposal/{id}'
        )

    print(resp.text)
    print(resp.status_code)
    if not debug:
        if id is None:
            json_response = resp.json()[2]
        else:
            json_response = resp.json()
        print(json_response['_id'])
        print(json_response.keys())
        print(json_response['members'])
        resp = resp.json()[0]
        print(resp.keys())
        resp.pop('pdf_document')
        print(resp)
        save_pdf(json_response['pdf_document']['data'], destn_pdf_path)


def patch(debug=False):
    req_body = dict(
        id = '62912ac4f4ebb586b9b82e02',
        remarks = 'Needs more novelty'
    )
    resp = requests.patch(
        'http://localhost:3000/api/proposal/reject',
        json = req_body
    )

    print(resp.text)    
    print(resp.status_code)
    if not debug:
        print(resp.json())

# <<<<<<< HEAD
# post()
# get(debug=False)
get(id='6283b09950a9e277f0f8cd5a', debug=False)
# patch()