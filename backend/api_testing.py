import requests
import json


def get_request(url):
    # url = "http://localhost:8080/"
    req = requests.get(url= url)
    return req

def post_request(url, data):
    req = requests.post(url= url, data=data)
    return req


host ="http://localhost:8080"


# print("Hitting home location as get request")
# url = host+"/"
# get_home_response = get_request(url)
# print(get_home_response.text)


print("Hitting the create application as post request")
url = host+ "/create_application"
body = {
    "name" : "jagz",
    "age" : "20"
}
response = post_request(url, body)
print(response.text)
