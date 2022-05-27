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
