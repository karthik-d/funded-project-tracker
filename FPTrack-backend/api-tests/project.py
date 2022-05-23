import requests
import base64
import os
import json

sample_pdf_path = os.path.join(os.getcwd(), *((os.path.pardir,)*1), 'check_files', 'agg_doc.pdf')

def post(debug=True):

    pdf_doc_b64_string = encode_pdf(sample_pdf_path)

    req_body = dict(
        proposal: "",
        approved_budget: 10000,
        approved_duration: 20,
    )

    resp = requests.post(
        'http://localhost:3000/api/project',
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
            'http://localhost:3000/api/project'
        )
    else:
        resp = requests.get(
            f'http://localhost:3000/api/project/{id}'
        )

    print(resp.text)
    print(resp.status_code)
    if not debug:
        print(resp.json())


# post()
# get(debug=False)
# get(id='62869d17060d20b1dbcb56ee', debug=False)

# print(resp.json())