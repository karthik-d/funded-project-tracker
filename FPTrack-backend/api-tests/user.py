import requests


def post(debug=True):
    req_body = dict(
        first_name = "Greg",
        last_name = "Timothy",
        date_of_birth = '1999-09-09',
        email = 'greg@gmail.com',
        role = 'faculty',
        access = ['user']
    )

    """
    req_body = dict(
        first_name = "Harry",
        last_name = "Yeates",
        date_of_birth = '1999-09-09',
        email = 'harry@gmail.com',
        role = 'faculty',
        access = ['resource_mgr']
    )
    """

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
            'http://localhost:3000/api/user'
        )
    else:
        resp = requests.get(
            f'http://localhost:3000/api/user/{id}'
        )

    print(resp.text)
    print(resp.status_code)
    if not debug:
        print(resp.json())

post()
get()
get(id='6283b09950a9e277f0f8cd5a')




# print(resp.json())