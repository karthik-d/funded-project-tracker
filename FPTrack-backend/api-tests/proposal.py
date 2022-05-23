import requests
import base64
import os
import json

sample_pdf_path = os.path.join(os.getcwd(), *((os.path.pardir,)*1), 'check_files', 'agg_doc.pdf')

def encode_pdf(filepath):
    pdf_doc_b64_bytes = base64.b64encode(open(filepath, 'rb').read())
    pdf_doc_b64_string = pdf_doc_b64_bytes.decode('utf-8')
    return pdf_doc_b64_string

def save_pdf(filedata):
    pass

def decode_pdf(byte_list):
    print(max(byte_list))
    print(min(byte_list))
    base64.b64decode(''.join([chr(ascii) for ascii in byte_list]))
    return None

def post(debug=True):

    pdf_doc_b64_string = encode_pdf(sample_pdf_path)

    req_body = dict(
        title = "IoT Driven Smart Trains",
        decription = "blah blah blah...",
        domains = ['iot', 'machine_learning'],
        supervisors = ['admin@admin.com', 'test@admin.com'],
        leader = 'ben@gmail.com',
        members = ['claire@gmail.com', 'derek@gmail.com'],
        funding_type = 'internal',
        funding_agency = 'SSN Trust',
        pdf_document = pdf_doc_b64_string,
        budget = 10000
    )

    resp = requests.post(
        'http://localhost:3000/api/proposal',
        json = req_body
    )

    print(resp.text)    
    print(resp.status_code)
    # print("Request:", resp.request.body.decode('utf-8')[:100])
    # print(type(resp.request.body))
    # print(len(resp.request.body)/(2**20))
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
        print(resp.json()['_id'])
        save_pdf(decode_pdf(resp.json()[0]['pdf_document']['data']))


# post()
get(debug=False)
# get(id='62869d17060d20b1dbcb56ee', debug=False)




# print(resp.json())