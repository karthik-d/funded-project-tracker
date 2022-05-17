import requests
import json


def get_request(url):
    # url = "http://localhost:8080/"
    req = requests.get(url= url)
    return req

def post_request(url, data):
    req = requests.post(url= url, data=data)
    return req


host ="http://localhost:3000"


# print("Hitting home location as get request")
# url = host+"/"
# get_home_response = get_request(url)
# print(get_home_response.text)


print("Hitting the create application as post request")
url = host+ "/projects/"
body = {
    "email" : "jagadish19039@cse.ssn.edu.in",
    "project_id" : "478",
    "project_domain" : "IoT",
    "project_name" : "IoT Driven Smart Bus Stops",
    "team_members" : {
        "email" : "karthikraja19048@cse.ssn.edu.in",
        "name" : "Karthik Raja A"
    }
}
response = post_request(url, body)
print(response.text)
print(response.status_code)
