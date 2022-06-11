import requests
import base64
import os
import json

sample_pdf_path = os.path.join(os.getcwd(), *((os.path.pardir,)*1), 'check_files', 'agg_doc.pdf')

def post(debug=True):


    req_body = dict(
        proposal ="62a4e20b19d791faaf76e195",
        approved_budget = 12000,
        approved_duration = 18,
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

    # print(resp.text)
    # print(resp.status_code)
    # print(resp.text)
    if not debug:
        resp = resp.json()[1]
        print(resp.keys())
        resp.pop('proposal')
        print(resp)


def patch(id=None, debug=True):
    req_body = dict(
        id ="62a4e23619d791faaf76e19a",
        title = "Patent submitted",
        description = "Fully approved design patent made",
        kind = "patent",
        reference = "www.patents.com/aaa123"
    )


    resp = requests.patch(
        'http://localhost:3000/api/project/update-status',
        json = req_body
    )

    print(resp.text)    
    # print(resp.json())
    print(resp.status_code)


# post()
patch()
get(debug=False)

# get(id='62869d17060d20b1dbcb56ee', debug=False)

# print(resp.json()),
