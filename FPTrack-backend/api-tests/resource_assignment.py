import requests


def post(debug=True):
    # req_body = dict(
    #   assigned_to = "628b54f2d6596e1e16a96827",
    #   assigned_by = "628f1954f5b6a7772b9885b0"
    # )

    req_body = dict(
        resource = "628abd6b4bc531d7264a0aae",
      assigned_to = "62a1e2c06d8b165d85b877e6",
      assigned_by = "628f1954f5b6a7772b9885b0"
    )

    resp = requests.post(
        'http://localhost:3000/api/resource-assignment',
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
# get()
# get(id='628abd6b4bc531d7264a0aaa')




# print(resp.json())