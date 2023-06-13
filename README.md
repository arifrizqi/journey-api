# Journey-API
Journey RestAPI
# How To Use
* ### Users ###
  URL Route: `http://127.0.0.1:8000/api/users/`

* **[GET]** Get All Users

  Header :
    * **Content-Type:** application/json
    * **Authorization:** Token
    
    Response:
    ```json
    {
      "status": "Success",
      "page": 1,
      "limit": 10,
      "totalUsers": 2,
      "totalPages": 1,
      "users": [
            {
                "id": "2c099275-9b08-48d5-88bd-23452962a6de",
                "full_name": "toriq",
                "email": "toriq@gmail.com",
                "address": "123 Main Street",
                "profile_photo_url": "https://storage.googleapis.com/journey-bangkit/profile.png",
                "gender": "Male",
                "age": "30",
                "phone_number": "1234567890",
                "created_at": "2023-06-01T07:58:22.000Z",
                "disability_name": "Blind",
                "skill_one_name": "video grafi",
                "skill_two_name": "video grafi"
            }
        ]
    }
    ```

* **[GET]** Get Specific Users
  
    Additional Route: `<:id>`

    Additional Route: `</name/:position>`

    Response:
    ```json
    {
    "status": "Success",
    "user": {
            "id": "e75cb5a0-e855-47d3-aa30-8042bc6d9027",
            "full_name": "John Doe",
            "email": "johndoe@example.com",
            "address": "123 Main Street",
            "profile_photo_url": "https://storage.googleapis.com/journey-bangkit/profile.png",
            "gender": "Male",
            "age": "30",
            "phone_number": "1234567890",
            "created_at": "2023-05-31T09:57:15.000Z",
            "disability_name": "Blind",
            "skill_one_name": "video grafi",
            "skill_two_name": "video grafi"
        }
    }
    ```

* **[POST]** User Login

    Additional Route: `<login>`

    Request: 
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
    Response:
    ```json
    {
      "status": "Success",
      "id_company": "0c6bba3f-3f92-4c6d-bec1-619c2dfd37a9",
      "roleId": 1,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjNmJiYWFmLTNmOTItNGM2ZC1iZWMxLTYxOWMyZGZkMzdhOSIsImVtYWlsIjoiaHJkQERhdGFTb2x1dGlvbnMuY29tIiwiaWF0IjoxNjg2NDUwNDQwfQ.0ZI-M7F6Ns09-GgFgyGpY70xSHqPINknMxfBvcL7kPg"
    }
    ```

* **[POST]** Add New User 

    Request: 
    ```json
    {
      "full_name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123",
      "skill_one": 1,
      "skill_two": 1,
      "id_disability": 1,
      "address": "123 Main Street",
      "gender": "Male",
      "age": "30",
      "phone_number": "1234567890"
    }
    ```
    Response:
    ```json
    {
        "status": "Success",
        "message": "User added successfully",
        "id": "e75cb5a0-e855-47d3-aa30-8042bc6d9027"
    }
    ```

* **[PUT]** Edit User
  
    Request:
    ```json
    {
      "email": "string",
      "full_name": "string",
      "disability": "string",
      "skill_one": "string",
      "skill_two": "string",
      "address": "string",
      "profile_photo_url": "file",
      "gender": "string",
      "age": "int",
      "phone_number": "int",
      "password": "string"
    }
    ```
    Response:
    ```json
    {
      "message": "Update Successful"
    }
    ```
* **[DELETE]** Delete Specific User
  
    Additional Route: `<:id>`
    
    Response:

    ```json
    {
        "status": "Success",
        "message": "User successfully deleted"
    }
    ```
* **[POST]** Apply Jobs

    Additional Route: `<:userId/vacancies/:vacancyId/apply> `

    Header :
    * **Content-Type:** application/json
    * **Authorization:** Token
    
    Response:
    ```json
    {
        "message": "Job application successful"
    }
    ```

* **[GET]** Get Status Jobs Apply

    Additional Route: `<:userId> `

    Header :
    * **Content-Type:** application/json
    * **Authorization:** Token
    
    Response:
    ```json
    {
      "status": "Success",
      "page": 1,
      "limit": 10,
      "totalJobApply": 1,
      "totalPages": 1,
      "data": [
          {
              "id": "ef04a1da",
              "full_name": "Arif Rizqi",
              "email": "arif@gmail.com",
              "address": "Serang",
              "profile_photo_url": "https://storage.googleapis.com/journey-bangkit/profile.png",
              "gender": "male",
              "age": "20",
              "phone_number": "028594632394",
              "applied_at": "2023-06-13T04:05:51.660Z",
              "status": "Pending",
              "disability_name": "Mobility Impairment",
              "skill_one_name": "SEO",
              "skill_two_name": "Python",
              "company_name": "PT Artistic Creations",
              "vacancy_placement_address": "Project Coordinator"
          },
          {
              "id": "ef04a1da",
              "full_name": "Arif Rizqi",
              "email": "arif@gmail.com",
              "address": "Serang",
              "profile_photo_url": "https://storage.googleapis.com/journey-bangkit/profile.png",
              "gender": "male",
              "age": "20",
              "phone_number": "028594632394",
              "applied_at": "2023-06-13T03:47:45.722Z",
              "status": "Accepted",
              "disability_name": "Mobility Impairment",
              "skill_one_name": "SEO",
              "skill_two_name": "Python",
              "company_name": "PT. Content Masters",
              "vacancy_placement_address": "UI/UX Designer"
          }
      ]
    }
    ```


---
* ### Companies ###
  URL Route: `http://127.0.0.1:8000/api/companies/`

* **[GET]** Get All Companies

  Header :
    * **Content-Type:** application/json
    * **Authorization:** Token

    Response:
    ```json
    {
      "status": "Success",
      "page": 1,
      "limit": 10,
      "totalCompanies": 2,
      "totalPages": 1,
      "companies": [
          {
              "id": "d57e489e-fe28-4479-b3a8-fa2460f543bb",
              "name": "PT Seribu",
              "address": "string",
              "city": "string",
              "province": "string",
              "logo": "https://storage.googleapis.com/journey-bangkit/company.png",
              "employees": 10,
              "email": "string",
              "roleId": 2,
              "sector_name": "Kavling"
        }
      ]
    }
    ```

* **[GET]** Get Specific Company
  
    Additional Route: `<:id>`

    Header :
    * **Content-Type:** application/json
    * **Authorization:** Token
    
    Response:
    ```json
    {
        "status": "Success",
        "company": {
            "id": "d57e489e-fe28-4479-b3a8-fa2460f543bb",
            "name": "PT Seribu",
            "address": "string",
            "city": "string",
            "province": "string",
            "logo": "https://storage.googleapis.com/journey-bangkit/company.png",
            "employees": 10,
            "email": "string",
            "roleId": 2,
            "sector_name": "Kavling"
        }
      }
    ```
* **[POST]** Company Login

    Additional Route: `<login>`
    
    Request: 
    ```json
    {
      "email": "hrd@company.com",
      "password": "Password123"
    }
    ```
    Response:
    ```json
    {
      "status": "Success",
      "id_company": "0c6bbaaf-3f92-4c6d-bec1-619c2dfd37a9",
      "roleId": 2,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjNmJiYWFmLTNmOTItNGM2ZC1iZWMxLTYxOWMyZGZkMzdhOSIsImVtYWlsIjoiaHJkQERhdGFTb2x1dGlvbnMuY29tIiwiaWF0IjoxNjg2NDUwNDQwfQ.0ZI-M7F6Ns09-GgFgyGpY70xSHqPINknMxfBvcL7kPg"
    }
    ```

* **[POST]** Add New Company 

    Request: 
    ```json
    {
      "name": "string",
      "address": "string",
      "city": "string",
      "province": "string",
      "employees": 1,
      "email": "string",
      "password": "string",
      "id_sector": 1
    }
    ```
    Response:
    ```json
    {
        "message": "Company added successfully"
    }
    ```

* **[PUT]** Update Company
  
    Request:
    ```json
    {
      "name": "string",
      "address": "string",
      "city": "string",
      "province": "string",
      "logo": "file",
      "desc": "string",
      "employees": 1,
      "id_sector": 1,
      "email": "string",
      "password": "string"
    }
    ```
    Response:
    ```json
    {
        "message": "Update Successful"
    }
    ```

* **[DELETE]** Delete Specific Company
  
    Additional Route: `<:id>`

    Header :
    * **Content-Type:** application/json
    * **Authorization:** Token

    Response:

    ```json
    {
        "status": "Success",
        "message": "Company deleted successfuly"
    }
    ```

 * **[POST]** Add vacancy
    
      Additional Route: `<:companyId/vacancies>`

    Request: 
    ```json
    {
        "placement_address": "string",
        "description": "string",
        "id_disability": 1,
        "skill_one": "string",
        "skill_two": "string",
        "job_type": 1,
        "deadline_time": "date"
    }
    ```
    Response:
    ```json
    {
        "message": "Vacancy created successfully"
    }
    ```
  
* **[GET]** Get All Vacancies in Company
    
    Additional Route: `<:companyId/vacancies>`
    
    Response:
    ```json
    {
      "status": "Success",
      "page": 1,
      "limit": 10,
      "totalVacancies": 2,
      "totalPages": 1,
      "vacancies": [
            {
                "id": "0be03113-eea8-4481-b4eb-ea4730cf949e",
                "placement_address": "Copywriter",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet blandit mauris. Integer nisl ex, semper ut erat quis, molestie laoreet leo. In faucibus lobortis arcu a rutrum. Suspendisse porttitor posuere varius. Aenean elementum eu lorem a elementum. Etiam lorem tellus, ornare et ullamcorper et, dictum ac turpis. Mauris porta venenatis odio eu porttitor. Aliquam erat volutpat. Praesent elementum ipsum non justo accumsan, ac semper libero ultrices. Nulla facilisi. Integer non metus sem. Phasellus vulputate pellentesque diam et aliquet. Aliquam pellentesque nunc et metus rhoncus fringilla.",
                "created_at": "2023-06-11T01:45:49.503Z",
                "updated_at": "2023-06-11T01:45:49.503Z",
                "deadline_time": "2023-07-03T09:14:30.000Z",
                "job_type": 2,
                "skill_one_name": "Python",
                "skill_two_name": "Adobe Photoshop",
                "disability_name": "Physical Disability",
                "company_logo": "https://storage.googleapis.com/journey-bangkit/company.png",
                "company_name": "PT Agile Solutions",
                "sector_name": "Infrastructure"
            },
            {
                "id": "6fe9a956-14b6-4236-a88b-c1a3d96b36c0",
                "placement_address": "Web Developer",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet blandit mauris. Integer nisl ex, semper ut erat quis, molestie laoreet leo. In faucibus lobortis arcu a rutrum. Suspendisse porttitor posuere varius. Aenean elementum eu lorem a elementum. Etiam lorem tellus, ornare et ullamcorper et, dictum ac turpis. Mauris porta venenatis odio eu porttitor. Aliquam erat volutpat. Praesent elementum ipsum non justo accumsan, ac semper libero ultrices. Nulla facilisi. Integer non metus sem. Phasellus vulputate pellentesque diam et aliquet. Aliquam pellentesque nunc et metus rhoncus fringilla.",
                "created_at": "2023-06-07T15:53:03.987Z",
                "updated_at": "2023-06-07T15:53:03.987Z",
                "deadline_time": "2023-07-05T09:14:30.000Z",
                "job_type": 1,
                "skill_one_name": "SEO",
                "skill_two_name": "User Experience Design",
                "disability_name": "Physical Disability",
                "company_logo": "https://storage.googleapis.com/journey-bangkit/company.png",
                "company_name": "PT Agile Solutions",
                "sector_name": "Infrastructure"
            }
        ]
    }
    ```

* **[GET]** Get Vacancies Each Company
    
    Additional Route: `<:companyId/vacancies/:vacancyId>`

    Header :
    * **Content-Type:** application/json
    * **Authorization:** Token
    
    Response:
    ```json
    {
        "id": "ab93f22d-47d9-49a1-b10d-6143de15e4e9",
        "placement_address": "Copywriter",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet blandit mauris. Integer nisl ex, semper ut erat quis, molestie laoreet leo. In faucibus lobortis arcu a rutrum. Suspendisse porttitor posuere varius. Aenean elementum eu lorem a elementum. Etiam lorem tellus, ornare et ullamcorper et, dictum ac turpis. Mauris porta venenatis odio eu porttitor. Aliquam erat volutpat. Praesent elementum ipsum non justo accumsan, ac semper libero ultrices. Nulla facilisi. Integer non metus sem. Phasellus vulputate pellentesque diam et aliquet. Aliquam pellentesque nunc et metus rhoncus fringilla.",
        "created_at": "2023-06-07T14:08:40.019Z",
        "updated_at": "2023-06-07T14:08:40.019Z",
        "deadline_time": "2023-07-03T09:14:30.000Z",
        "skill_one_name": "Python",
        "skill_two_name": "Adobe Photoshop",
        "job_type": 2,
        "disability_name": "Physical Disability",
        "company_logo": "https://storage.googleapis.com/journey-bangkit/company.png",
        "company_name": "PT Agile Solutions",
        "sector_name": "Infrastructure"
    }
    ```

* **[PUT]** Update vacancy
    
    Additional Route: `<:companyId/vacancies/:vacancyId>`

    Request: 
    ```json
    {
        "placement_address": "string", 
        "description": "string",
        "skill_one": "string",
        "skill_two": "string",
        "id_disability": 2,
        "job_type": 2,
        "deadline_time": "date"
    }
    ```
    Response:
    ```json
    {
        "message": "Vacancy updated successfully"
    }
    ```

* **[DELETE]** Delete vacancy
    
    Additional Route: `<:companyId/vacancies/:vacancyId>`

    Header :
    * **Content-Type:** application/json
    * **Authorization:** Token

    Response:
    ```json
    {
        "message": "Vacancy deleted successfully"
    }
    ```

* **[GET]** List Applicants
    
    Additional Route: `<:companyId/vacancies/:vacancyId/applicants>`

    Header :
    * **Content-Type:** application/json
    * **Authorization:** Token

    Response:
    ```json
    [
      {
          "id": "43fcf8bd-0d95-4088-813b-cef893d1baad",
          "full_name": "Arif Rizqi",
          "email": "arif@gmail.com",
          "address": "Serang",
          "profile_photo_url": "https://storage.googleapis.com/journey-bangkit/profile.png",
          "gender": "male",
          "age": "20",
          "phone_number": "028594632394",
          "applied_at": "2023-06-06T12:56:55.317Z",
          "disability_name": "Mobility Impairment",
          "skill_one_name": "SEO",
          "skill_two_name": "Python"
      }
    ]
    ```

* **[PUT]** Accept Applicants
    
    Additional Route: `<:companyId/vacancies/:vacancyId/applicants/:applicantsId/accept>`

    Header :
    * **Content-Type:** application/json
    * **Authorization:** Token

    Response:
    ```json
    {
      "status": "Success",
      "message": "Applicant accepted"
    }
    ```

    * **[PUT]** Reject Applicants
    
      Additional Route: `<:companyId/vacancies/:vacancyId/applicants/:applicantsId/reject>`

      Header :
    * **Content-Type:** application/json
    * **Authorization:** Token

    Response:
    ```json
    {
      "status": "Success",
      "message": "Applicant rejected"
    }
    ```

---
* ### Vacancies ###
  URL Route: `http://127.0.0.1:8000/api/vacancies/`

* **[GET]** Get All vacancy
    
    Response:
    ```json
    {
      "status": "Success",
      "page": 1,
      "limit": 10,
      "totalVacancies": 1,
      "totalPages": 1,
      "vacancies": [
            {
                "id": "ab93f22d-47d9-49a1-b10d-6143de15e4e9",
                "placement_address": "Copywriter",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet blandit mauris. Integer nisl ex, semper ut erat quis, molestie laoreet leo. In faucibus lobortis arcu a rutrum. Suspendisse porttitor posuere varius. Aenean elementum eu lorem a elementum. Etiam lorem tellus, ornare et ullamcorper et, dictum ac turpis. Mauris porta venenatis odio eu porttitor. Aliquam erat volutpat. Praesent elementum ipsum non justo accumsan, ac semper libero ultrices. Nulla facilisi. Integer non metus sem. Phasellus vulputate pellentesque diam et aliquet. Aliquam pellentesque nunc et metus rhoncus fringilla.",
                "created_at": "2023-06-07T14:08:40.019Z",
                "updated_at": "2023-06-07T14:08:40.019Z",
                "deadline_time": "2023-07-03T09:14:30.000Z",
                "skill_one_name": "Python",
                "skill_two_name": "Adobe Photoshop",
                "job_type": 2,
                "disability_name": "Physical Disability",
                "company_logo": "https://storage.googleapis.com/journey-bangkit/company.png",
                "company_name": "PT Agile Solutions",
                "sector_name": "Infrastructure"
            }
        ]
    }
    ```

* **[GET]** Get Specific vacancy
  
    Additional Route: `<:id>`

    Additional Route: `</name/:position>`

    Header :
    * **Content-Type:** application/json
    * **Authorization:** Token
    
    Response:
    ```json
    {
      "status": "Success",
      "vacancy": {
            "id": "ab93f22d-47d9-49a1-b10d-6143de15e4e9",
            "placement_address": "Copywriter",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet blandit mauris. Integer nisl ex, semper ut erat quis, molestie laoreet leo. In faucibus lobortis arcu a rutrum. Suspendisse porttitor posuere varius. Aenean elementum eu lorem a elementum. Etiam lorem tellus, ornare et ullamcorper et, dictum ac turpis. Mauris porta venenatis odio eu porttitor. Aliquam erat volutpat. Praesent elementum ipsum non justo accumsan, ac semper libero ultrices. Nulla facilisi. Integer non metus sem. Phasellus vulputate pellentesque diam et aliquet. Aliquam pellentesque nunc et metus rhoncus fringilla.",
            "created_at": "2023-06-07T14:08:40.019Z",
            "updated_at": "2023-06-07T14:08:40.019Z",
            "deadline_time": "2023-07-03T09:14:30.000Z",
            "skill_one_name": "Python",
            "skill_two_name": "Adobe Photoshop",
            "job_type": 2,
            "disability_name": "Physical Disability",
            "company_logo": "https://storage.googleapis.com/journey-bangkit/company.png",
            "company_name": "PT Agile Solutions",
            "sector_name": "Infrastructure"
        }
    }
    ```

* **[GET]** Get Popular Vacancy
  
    Additional Route: `<popular>`
    
    Response:
    ```json
    {
      "status": "Success",
      "page": 1,
      "limit": 10,
      "totalVacancies": 26,
      "totalPages": 3,
      "vacancies": [
            {
                "id": "87e514c1-c081-4b81-92c2-5cdf5deaab0d",
                "placement_address": "Project Manager",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet blandit mauris. Integer nisl ex, semper ut erat quis, molestie laoreet leo. In faucibus lobortis arcu a rutrum. Suspendisse porttitor posuere varius. Aenean elementum eu lorem a elementum. Etiam lorem tellus, ornare et ullamcorper et, dictum ac turpis. Mauris porta venenatis odio eu porttitor. Aliquam erat volutpat. Praesent elementum ipsum non justo accumsan, ac semper libero ultrices. Nulla facilisi. Integer non metus sem. Phasellus vulputate pellentesque diam et aliquet. Aliquam pellentesque nunc et metus rhoncus fringilla.",
                "deadline_time": "2023-07-05T09:14:30.000Z",
                "job_type": 3,
                "id_company": "696358c5-77b8-41d6-825d-d48a33916f18",
                "created_at": "2023-06-07T23:48:31.725Z",
                "updated_at": "2023-06-07T23:48:31.725Z",
                "disability_name": "Visual Impairment",
                "skill_one_name": "Team Leadership",
                "skill_two_name": "Calendar Management",
                "company_logo": "https://storage.googleapis.com/journey-bangkit/company.png",
                "company_name": "PT ArchiDesign",
                "sector_name": "Construction",
                "total_applicants": 10
            }
        ]
    }
    ```

* **[GET]** Get Latest Vacancy
  
    Additional Route: `<latest>`
    
    Response:
    ```json
    {
      "status": "Success",
      "page": 1,
      "limit": 10,
      "totalVacancies": 26,
      "totalPages": 3,
      "vacancies": [
            {
                "id": "86039143-becf-445d-b532-9a22766736fb",
                "placement_address": "Copywriter",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet blandit mauris. Integer nisl ex, semper ut erat quis, molestie laoreet leo. In faucibus lobortis arcu a rutrum. Suspendisse porttitor posuere varius. Aenean elementum eu lorem a elementum. Etiam lorem tellus, ornare et ullamcorper et, dictum ac turpis. Mauris porta venenatis odio eu porttitor. Aliquam erat volutpat. Praesent elementum ipsum non justo accumsan, ac semper libero ultrices. Nulla facilisi. Integer non metus sem. Phasellus vulputate pellentesque diam et aliquet. Aliquam pellentesque nunc et metus rhoncus fringilla.",
                "deadline_time": "2023-07-03T09:14:30.000Z",
                "job_type": 2,
                "id_company": "1bf1c3e5-c3f7-403b-8919-091da23a9bf8",
                "created_at": "2023-06-11T01:52:21.709Z",
                "updated_at": "2023-06-11T01:52:21.709Z",
                "disability_name": "Physical Disability",
                "skill_one_name": "Python",
                "skill_two_name": "Adobe Photoshop",
                "company_logo": "https://storage.googleapis.com/journey-bangkit/company.png",
                "company_name": "PT TechSol Solutions",
                "sector_name": "Health care"
            }
        ]
    }
    ```