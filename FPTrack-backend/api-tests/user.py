import requests


def post(debug=True):
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


def get(debug=True):
    resp = requests.get(
        'http://localhost:3000/api/user/62861fe598960b16fdbcbb48',
    )

    print(resp.text)
    print(resp.status_code)
    if not debug:
        print(resp.json())


get()




# print(resp.json())