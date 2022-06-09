# Funded-Project-Tracker System

![FP-Tracker-Logo](assets/logo.png?raw=true)

A centralized online system, with a web-application interface, to manage internally and externally funded projects affiliated to the college.
It handles the following key aspects:
- Resource management and repurposing for internally funded projects
- Project status, updates and outcomes repository for all projects
- Filterable and customized summary stats of faculty and student projects
- Resource inventory and project deliverable/outcome report generation for all projects

# Development References

## Frontend

### Notes
- Send the PDF proposal as a single Base64 encoded string

### Validations to handle
- PDF Proposal Upload must be under 8MB (soft limit)

### Server-Client Behavior Agreeement
- When new user uses OAuth to register, the token validation (POST /api/auth/) will return with,
  ```
  {
      error_code: 901,
      message: "User must be created",
      url: "/api/user/",
      method: "POST"
  }
  HTTP_CODE: 404
  ```
  Initiate a form on the frontend to collect user metadata i.e. role, access, etc. and create a user using the given URL and METHOD.
  Then, send the same token  to the token validation (POST /api/auth/) endpoint.
  
### Tailored API Endpoints

**NOTE**: Specify API endpoint requirements under `Requested Endpoint Requirements` here: https://docs.google.com/document/d/1BuqWLfZSf08XkSRbJId3BAIZCT0FmTrVLlO-6XchuT4/edit?usp=sharing

#### GET api/user[?field=value&...]

- Resonds with all user collections
- Now supports **filters**! Multiple filters may be used 
- The following fields can be used for fitering by being passed as GET query parameters,
  - `?email=abc@gmail.com`
  - `?first_name=Adam` : Case-sensitive for now
  - `?last_name=Adam` : Case-sensitive for now
  - `?role=student` : One of `faculty`, `student`

#### GET api/proposal/user/[userId]

- `userId` is the `_id` field value of the user
- Responds with all projects belonging to the specified user, like so
  ```
  {
    as_supervisor: [ <proposal collections with the user as a supervisor>... ],
    as_member: 	[ <proposal collections with the user as a member>... ],
    as_leader: 	[ <propoal collections with the user as a leader>... ]
  }
  ```

#### GET api/project/user/[userId]

- `userId` is the `_id` field value of the user
- Responds with all projects belonging to the specified user, like so
  ```
  {
    as_supervisor: [ <project collections with the user as a supervisor>... ],
    as_member: 	[ <project collections with the user as a member>... ],
    as_leader: 	[ <project collections with the user as a leader>... ]
  }
  ```
#### GET api/resource-group?available=[anything]

- `[anything]` is an arbitrary value. This is parsed for GET syntactic convenience - value ignored
- The key `available` is of importance
- Responds with all resource groups having allocatable resources along with an additional field `avl_qty` to denote number of reource instances of the group that can be allotted, like so
 ```
 [
  {
    <all-resource-group fields> : <field-values>,
    .
    .
    avl_qty: 2
  }
  .
  .
 ]
```
#### PATCH api/proposal/reject : To REJECT a proposal

With request body,
```
{
  id: '62912ac4f4ebb586b9b82e02',
  remarks: 'Needs more novelty'
}
```
- `id` is the corresponding proposal's `_id` field
- `remarks` is the remarks given during rejection, by the scrutiny team (if any)
- Marks the proposal as `rejected`, as long as it is `pending decision` state --- neither approved nor rejected to far
- Responds with the proposal's `_id`  and updation status.

#### POST api/project : To ACCEPT a proposal

With request body,
```
{
  proposal = <proposal_id>,
  approved_budget = 10000,
  approved_duration = 20
}
```
- `proposal` is the corresponding proposal's `_id` field
- `approved_duration` is the the approved project duration in months
- Marks the proposal as `rejected`, as long as it is `pending decision` state --- neither approved nor rejected to far
- Responds with the proposal's `_id`  and updation status.

#### PATCH api/project/update-status : To add a status update for a project

With request body like so,
```
{
  id: '62912ac4f4ebb586b9b82e02',
  title: 'Lit survey done',
  description: 'reviewed 10 directions'
}
```
- `id` is the corresponding project's `_id` field
- `title` is a short name for the update
- `description` (optional) is a short description abo0ut the status update
- Updates are `rejected` if they are made more frequently than 2 days i.e. the second update in a continual period of 2 days is rejected
- Responds with the proposal's `_id`, a short message and the update title

## Backend

### Major Design Todos

- [ ] Find unique/de-duplication factor for Proposals (and hence, Projects)
- [ ] Find unique/de-duplication factor for Resource Groups

### Install NPM and Node.js

Use LTS - Version v16.15.0
(includes npm 8.5.5)

- Install NVM using this: https://github.com/nvm-sh/nvm#install--update-script 
- Install NodeJS LTS (16.15.0 as of now)
`nvm install --lts`


### Global Installs

Do `npm install -g [package-name]`

- [migrate-mongoose](https://www.npmjs.com/package/migrate-mongoose)
- [nodemon](https://www.npmjs.com/package/nodemon)
- express (Obviously!)
- express-generator

# References


## Internal Error Codes      


 
| Code    | Description | Suggested Action  |
| :---:   | :---------- | :---------------- |
| `901`   | Valid google user does not exist on FPTrack DB | Create user with same email, along with metadata by POSTing to /api/user first |
| `951`   | Trying to modify approval/rejection status of already approved/rejected proposal| `N/A`: Verify proposal details with admin | 
| `951`   | DB error when trying to update status of a collection | Attempt the same operation later | 
 


## Atomic UML Documents
- [Team Google Drive Directory](https://drive.google.com/drive/folders/1q4Pmt54Smr6XTmxe8-WBDu5sHodzzcVc?usp=sharing)
- [Problem Statement Specification](https://drive.google.com/file/d/12lmrwYze91KfEdE4WlvUXiz-RDvtJo6p/view?usp=sharing)
- [Software Requirements Specification (SRS)](https://drive.google.com/file/d/17_LVAnczzPp9dCqcMjCTuRk5oyWuHSey/view?usp=sharing)
- [Use Case Description](https://drive.google.com/file/d/1EWN7n4BdxVWAyzEIRaZPsam0lJF2VHPR/view?usp=sharing)
- [Domain Model and Class Diagram](https://drive.google.com/file/d/1mdhwhTaIcUtHynZvmKQYCgOhw7ryTXJi/view?usp=sharing)
- [Sequence Interaction Diagrams](https://drive.google.com/file/d/1sXMSgy5DzYcDDZwpKN5_dZdbmhOel501/view?usp=sharing)
- [State Machine Diagrams](https://drive.google.com/file/d/1UlJB45QFjSIvGsh330DjKgyfvKjCrP0Z/view?usp=sharing)
- [Acitivity Diagrams](https://drive.google.com/file/d/12TvG0STKMjBehhBIDZHklc6XvqFTVLRf/view?usp=sharing)

## Compiled Document
- [Aggregated Documentation - Upto Activity Diagrams](https://drive.google.com/file/d/1-ugSlGmEHbMfo-DBxR1wm4ZShB_HDwF-/view?usp=sharing)

## Procedure to Execute

### Common Dependencies

- nodejs 16.15.0 LTS (preferably, with nvm)

### Frontend
- Navigate to ./FPTrack-frontend
- Install local dependencies using `npm install` from current context
- Run `npm run dev` to get the frontend service going

### Backend
- Navigate to ./FPTrack-backend
- Ensure that all `global installs` are done
- Install local dependencies using `npm install` from current context
- Run `npm run serverstart` to get the development server going
