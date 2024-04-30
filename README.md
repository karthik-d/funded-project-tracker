# Funded-Project-Tracker System

![FP-Tracker-Logo](assets/logo.png?raw=true)

A centralized online platform, with a web-application interface, to manage internally and externally funded **research projects** affiliated to [SSN College of Engineering, Chennai, India](https://www.ssn.edu.in/college-of-engineering/).

> Deployed as an internal web-application on the intra-network of the college. Currently under use at the Department of Computer Science for managing research project proposals, status, and outcomes.

It handles the following aspects of research projects and grant applications:
- Resource management, tracking, and repurposing for internally funded projects.
- Project status, updates, and outcomes repository for all projects in the past and present.
- Filterable and customized summary statistics of faculty and student projects, organized by domain and tech stack.
- Resource inventory and project deliverable/outcome report generation for all projects.

## Quick Links
- [Problem Statement and User Stories [Markdown]](./docs/problem-statement.md).
- [Development References [Markdown]](./docs/development-references.md).
- [Team Google Drive Directory (_private access_)](https://drive.google.com/drive/folders/1q4Pmt54Smr6XTmxe8-WBDu5sHodzzcVc?usp=sharing).

## Compiled Documentation

[**Link to Complete Project Report [PDF]**](https://drive.google.com/file/d/1-ugSlGmEHbMfo-DBxR1wm4ZShB_HDwF-/view?usp=sharing).

> [!NOTE]
> Kindly direct requests for access to documentation to one of the repository collaborators by email; they can be made available upon reasonable request. Thanks!

### Atomic UML Documents
- [Problem Statement Specification](https://drive.google.com/file/d/12lmrwYze91KfEdE4WlvUXiz-RDvtJo6p/view?usp=sharing)
- [Software Requirements Specification (SRS)](https://drive.google.com/file/d/17_LVAnczzPp9dCqcMjCTuRk5oyWuHSey/view?usp=sharing)
- [Use Case Description](https://drive.google.com/file/d/1EWN7n4BdxVWAyzEIRaZPsam0lJF2VHPR/view?usp=sharing)
- [Domain Model and Class Diagram](https://drive.google.com/file/d/1mdhwhTaIcUtHynZvmKQYCgOhw7ryTXJi/view?usp=sharing)
- [Sequence Interaction Diagrams](https://drive.google.com/file/d/1sXMSgy5DzYcDDZwpKN5_dZdbmhOel501/view?usp=sharing)
- [State Machine Diagrams](https://drive.google.com/file/d/1UlJB45QFjSIvGsh330DjKgyfvKjCrP0Z/view?usp=sharing)
- [Acitivity Diagrams](https://drive.google.com/file/d/12TvG0STKMjBehhBIDZHklc6XvqFTVLRf/view?usp=sharing)

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
