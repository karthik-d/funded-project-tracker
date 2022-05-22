import requests


def post(debug=True):
    req_body = dict(
      name: "Raspberry Pi 3",
      description: "Microcontroller board without WiFi built-in",
      kind: "hardware",
      is_multi_assignable: false
    )

    resp = requests.post(
        'http://localhost:3000/api/resource-group',
        json = req_body
    )

    print(resp.text)    
    print(resp.status_code)
    if not debug:
        print(resp.json())


def get(id=None, debug=True):
    if id is None:
        resp = requests.get(
            'http://localhost:3000/api/resource-group'
        )
    else:
        resp = requests.get(
            f'http://localhost:3000/api/resource-group/{id}'
        )

    print(resp.text)
    print(resp.status_code)
    if not debug:
        print(resp.json())

post()
get()
get(id='6283b09950a9e277f0f8cd5a')




# print(resp.json())