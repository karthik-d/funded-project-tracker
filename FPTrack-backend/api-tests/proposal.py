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
        title = "Number Plate Detection",
        decription = "Blah blah blah...blah..",
        domains = ['machine_learning'],
        supervisors = ['claire@gmail.com'],
        leader = 'greg@gmail.com',
        members = ['ben@gmail.com', 'claire@gmail.com'],
        funding_type = 'external',
        funding_agency = 'DST-SERB',
        pdf_document = pdf_doc_b64_string,
        budget = 50000
    )
    resp = requests.post(
        'http://localhost:3000/api/proposal',
        json = req_body
    )

    print(resp.text)    
    print(resp.status_code)
    if not debug:
        print(resp.json())


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
        save_pdf(json_response['pdf_document']['data'], destn_pdf_path)


# <<<<<<< HEAD
post()
# get(debug=False)
# get(id='628b5425099b1ba80b543da6', debug=False)