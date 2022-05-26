import requests
import base64
import os
import json

sample_pdf_path = os.path.join(os.getcwd(), *((os.path.pardir,)*1), 'check_files', 'agg_doc.pdf')

def post(debug=True):

<<<<<<< HEAD
    # req_body = dict(
    #     proposal ="628b5425099b1ba80b543da6",
    #     approved_budget = 10000,
    #     approved_duration = 20,
    # )
    req_body = dict(
        proposal ="628f1b9df5b6a7772b9885b8",
        approved_budget = 25000,
        approved_duration = 40,
    )
=======
    req_body = dict(
        proposal ="628b5425099b1ba80b543da6",
        approved_budget = 10000,
        approved_duration = 20,
    )

>>>>>>> 8ef04d9992f6a449617d22334dbf60719305c3a5
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


<<<<<<< HEAD
post()
# get(debug=False)
=======
# post()
get(debug=False)
>>>>>>> 8ef04d9992f6a449617d22334dbf60719305c3a5
# get(id='62869d17060d20b1dbcb56ee', debug=False)

# print(resp.json())