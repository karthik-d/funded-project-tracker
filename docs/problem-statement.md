# Funded Project Tracking System

## Problem Statement

Every year, several SSNites face issues in submitting and receiving timely response on their funded project proposals. There is no centralized system to apply, approve and track the progress of applications. 

Furthermore, there is a need to track resources available with the department and repurpose them for upcoming projects with similar requirements, as opposed to granting funds to acquire redundant components.

## Proposed Solution
We propose a centralized online system to manage internally and externally funded projects in the college. The following aspects will be handled by the system:

### Applying to Projects
The web-application can be used to apply, scrutinize and track internal funding requests. In addition, it will serve as a repository to record the status of externally funded projects affiliated to the college.

#### Internal Projects
The research cell can use the proposed web-application to roll out applications for internally funded faculty and student projects, with set deadlines.

Faculty and students may apply for such funding and continue to track the status of application scrutiny through the system.

The scrutiny team can update the status of each project on the system, as they pass through each round of scuriny, potentially offering reviewer comments/feedback through the same portal, visible only to the applicants.

Prior to approving funds, the scrutiny team can find resources already available with the department, allocate them to the project and grant funds only for components that aren't already available with the department.

Approved projects can then be used by the applicants to record regular progress, directly visble to the research cell. The final outcomes of the projects will be added to the project in the end and archived into the database.

Upon project completion, the newly acquired resources are inventorized on the system and submitted to the department.

#### External Projects
Applicants applying for extrernal funding must update details and status of their applications, detailing aspects about the funding authority, domain of work, budget requested, etc.

Intermediate and final outcomes of the projects must also be updated by the applicants, and will be archived after completion.

### Resource Management
The system also maintains a repository of project resources already available with the system. This includes availability status of the resources. 

The scrutiny team can choose to allocate these resources to newly approved applicants, whilst approving funds for other requirements alone. This ensures efficient usage and economic repurposing of the college's resources.

Faculty/Students, upon project completion, will deposit the newly acquired components with the department. These items will inventorized on the system for reuse in future.

### Report Generation
Summary statistics of applied and approved funding projects can be curated through the system based on multiple filtering criteria.

This can prove useful during research showcases and academic year progress presentations. Furthermore, it can be pivotal in auditing research and academic activities.

## Entity Description
- Project types can be one of:
    - Externally funded projects
        - Faculty projects
    - Internally funded projects
        - IFSP
        - IFFP

- Proposal/Applications can be set to one of the following statuses:
    - Applied
    - Shortlisted for Presentation
    - Approved
    - Rejected

- Approved projects are maintained as a separate repository with the folowing possible statuses:
    - Ongoing
    - Completed
     
- Regular updates and final outcomes are recorded along with the completed projects before archival. Outcomes will be represented as:
    - Publications 
        - Link to publications project _or_ DBLP / Google Scholar page
    - Patents
    - Forwarded to External Funding
    
- Resource repository to inventory components already available, categorized as:
    - Resources currently under use
    - Available resources
    
- Report generation with filters, such as:
    - calendar period
    - project members
    - project domain
    - budget
    - status
    
- Application and scrutiny interface
    - Status upgrades 
    - Email status triggers


## User Stories
#### Open Access (Unauthenticated Guest User)
- View statistics
- Generate reports and graphs
- View approved projects list

#### Admin
- User and Database administration

#### Applicant - Faculty/Student
- Applies to internal projects on the portal
- Checks the status of internal applications
- Edits applications until the deadline
- Updates progress of projects on the web-application
- Records final outcome of projects
- Enters details of external funding applications

#### Scrutiny team
- Scrutinizes internal funding applications package
- Upgrades / Rejects application status
- View status of all resources
    - Under use for a different project
    - Can be disbursed for this project
- Design application forms 

#### Resource Manager
- Updates status and inventorizes resources when they are surrendered
- Monitors resource inventory managed on the website