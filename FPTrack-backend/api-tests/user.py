import requests

req_body = dict(
      first_name = "Adam",
      last_name = "Levy",
      date_of_birth = '1999-09-09',
      email = 'test@admin.com',
      role = 'faculty',
      access = ['user']
)

resp = requests.post(
    'http://localhost:8080/api/user',
    json = req_body
)

print(resp.text)    
print(resp.status_code)
print(resp.json())