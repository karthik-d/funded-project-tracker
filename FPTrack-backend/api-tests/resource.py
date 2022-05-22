import requests


def post(debug=True):
    req_body = dict(
        resource_group = "628abd6b4bc531d7264a0aaa",
        remarks = "Microcontroller board without WiFi built-in",
        scan_code = "XXXX123456"
    )

    resp = requests.post(
        'http://localhost:3000/api/resource',
        json = req_body
    )

    print(resp.text)    
    print(resp.status_code)
    if not debug:
        print(resp.json())


def get(id=None, debug=True):
    if id is None:
        resp = requests.get(
            'http://localhost:3000/api/resource'
        )
    else:
        resp = requests.get(
            f'http://localhost:3000/api/resource/{id}'
        )

    print(resp.text)
    print(resp.status_code)
    if not debug:
        print(resp.json())

# post()
get()
# get(id='628abd6b4bc531d7264a0aaa')




# print(resp.json())