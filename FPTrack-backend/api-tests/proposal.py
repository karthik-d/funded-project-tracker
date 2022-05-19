import requests
import base64
import os

sample_pdf_path = os.path.join(os.getcwd(), *((os.path.pardir,)*1), 'check_files', 'agg_doc.pdf')

def post(debug=True):

    pdf_doc_b64 = base64.b64encode(open(sample_pdf_path, 'rb').read())
    print(pdf_doc_b64)

    req_body = dict(
        title = "IoT Driven Smart Trains",
        decription = "blah blah blah...",
        domains: ['iot', 'machine_learning'],
        supervisors: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'user'
            }],
            required: true
        },
        // the user type of leader determines if project is Student project or Faculty project
        leader: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        members: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'user'
            }],
            required: true
        },
        funding_type: {
            type: String,
            enum: ['internal', 'external'],
            required: true
        },
        // TODO: Convert this to an enum type with possibility of adding new fuding agencies??
        funding_agency: {
            type: String,
            required: true
        },
        // Accepts file sizes upto 16MB -- Indicate limit as 8MB on Frontend 
        // Transit as Base64 string on JSON 
        pdf_document: {
            type: Buffer,
            required: true
        },
        budget: {
            type: Number,
            required: true
        },
        deleted_at: {
            type: Date,
            default: null
        }
    )

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
            'http://localhost:3000/api/proposal'
        )
    else:
        resp = requests.get(
            f'http://localhost:3000/api/proposal/{id}'
        )

    print(resp.text)
    print(resp.status_code)
    if not debug:
        print(resp.json())


post()
get()




# print(resp.json())