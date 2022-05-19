import requests
import base64
import os

sample_pdf_path = os.path.join(os.getcwd(), *((os.path.pardir,)*1), 'check_files', 'agg_doc.pdf')

def post(debug=True):

    pdf_doc_b64 = base64.b64encode(open(sample_pdf_path, 'rb').read())
    print(pdf_doc_b64)

    req_body = dict(
        first_name = "Adam",
        last_name = "Levy",
        date_of_birth = '1999-09-09',
        email = 'test@admin.com',
        role = 'faculty',
        access = ['user']
    )

    resp = requests.post(
        'http://localhost:3000/api/user',
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
        print(resp.json())


post()
get()




# print(resp.json())