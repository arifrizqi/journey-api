# Journey-API
Journey RestAPI
# How To Use
* ### Users ###
  URL Route: `http://127.0.0.1:8000/api/users/`

  * **[GET]** Get All Users
    
    Response:
    ```
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
                "password": "$2b$10$HqsihjGTkM5BqyNJwgIBdOHUuabexzYuhSTUm/IxOrg5Yc1JSmOsm",
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

    Response:
    ```
    {
    "status": "Success",
    "user": {
            "id": "e75cb5a0-e855-47d3-aa30-8042bc6d9027",
            "full_name": "John Doe",
            "email": "johndoe@example.com",
            "password": "$2b$10$iLxDOwX2fCUADhwgZimQnehvBRYYIITO4zmriLODUsaL2LjZKJnnm",
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
  * **[POST]** Add New User 

    Request: 
    ```
    {
      "full_name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123",
      "skill_one": "1",
      "skill_two": "1",
      "id_disability": "1",
      "address": "123 Main Street",
      "gender": "Male",
      "age": "30",
      "phone_number": "1234567890"
    }
    ```
    Response:
    ```
    {
        "status": "Success",
        "message": "User added successfully",
        "id": "e75cb5a0-e855-47d3-aa30-8042bc6d9027"
    }
    ```

  * **[PUT]** Edit User
  
    Request:
    ```
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
    ```
    {
      "message": "Update Successful"
    }
    ```
  * **[DELETE]** Delete Specific User
  
    Additional Route: `<:id>`
    
    Response:

    ```
    {
        "status": "Success",
        "message": "User successfully deleted"
    }
    ```
  * **[POST]** Apply Jobs

    Additional Route: `<:userId/apply/:vacancyId> `
    
    Response:
    ```
    {
        "message": "Job application successful"
    }
    ```


---
* ### Companies ###
  URL Route: `http://127.0.0.1:8000/api/companies/`

  * **[GET]** Get All Companies

    Response:
    ```
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
              "description": "string",
              "employees": 10,
              "email": "string",
              "password": "$2b$10$/LoRNz3uJ0z3Yq5Mi9QE4Ofjaz7NUei/FkQU6zxajYW7.ktIdoPN.",
              "roleId": 2,
              "sector_name": "Kavling"
        }
      ]
    }
    ```

  * **[GET]** Get Specific Company
  
    Additional Route: `<:id>`
    
    Response:
    ```
    {
        "status": "Success",
        "company": {
            "id": "d57e489e-fe28-4479-b3a8-fa2460f543bb",
            "name": "PT Seribu",
            "address": "string",
            "city": "string",
            "province": "string",
            "logo": "https://storage.googleapis.com/journey-bangkit/company.png",
            "description": "string",
            "employees": 10,
            "email": "string",
            "password": "$2b$10$/LoRNz3uJ0z3Yq5Mi9QE4Ofjaz7NUei/FkQU6zxajYW7.ktIdoPN.",
            "roleId": 2,
            "sector_name": "Kavling"
        }
      }
    ```
  * **[POST]** Add New Company 

    Request: 
    ```
    {
      "name": "string",
      "address": "string",
      "city": "string",
      "province": "string",
      "logo": "file",
      "description": "string",
      "employees": int,
      "sector": "string",
      "email": "string",
      "password": "string",
      "id_sector": int
    }
    ```
    Response:
    ```
    {
        "message": "Company added successfully"
    }
    ```

  * **[PUT]** Edit Company
  
    Request:
    ```
    {
      "name": "string",
      "address": "string",
      "city": "string",
      "province": "string",
      "logo": "file",
      "desc": "string",
      "employees": "int",
      "id_sector": "int",
      "email": "string",
      "password": "string"
    }
    ```
    Response:
    ```
    {
        "message": "Update Successful"
    }
    ```

  * **[DELETE]** Delete Specific Company
  
    Additional Route: `<:id>`
    
    Request:

    ```
    (null)
    ```

    Response:

    ```
    {
        "status": "Success",
        "message": "Company deleted successfuly"
    }
    ```

  * **[POST]** Add vacancy
    
      Additional Route: `<:companyId/vacancies>`

    Request: 
    ```
    {
        "placement_address": "string",
        "description": "string",
        "sector": "string",
        "id_disability": "int",
        "deadline_time": "date"
    }
    ```
    Response:
    ```
    {
        "message": "Vacancy created successfully"
    }
    ```

  * **[GET]** Get Vacancies Each Company
    
      Additional Route: `<:companyId/vacancies>`

    Response:
    ```
    {
      "totalCount": 1,
      "currentPage": 1,
      "totalPages": 1,
      "vacancies": [
            {
                "id": "88fe943c-3b65-49a9-b789-ff4b7bb10315",
                "placement_address": "Lowongan Programmer",
                "description": "description",
                "sector": "asda",
                "id_disability": "1",
                "deadline_time": "2023-05-29T09:14:30.000Z",
                "id_company": "d57e489e-fe28-4479-b3a8-fa2460f543bb",
                "created_at": "2023-06-01T07:59:04.938Z",
                "updated_at": "2023-06-01T07:59:04.938Z"
            }
        ]
    }
    ```

  * **[PUT]** Update vacancy
    
      Additional Route: `<:companyId/vacancies/:vacancyId>`

    Request: 
    ```
    {
        "placement_address": "string", 
        "description": "string",
        "sector": "string",
        "id_disability": "int",
        "deadline_time": "date"
    }
    ```
    Response:
    ```
    {
        "message": "Vacancy updated successfully"
    }
    ```

  * **[DELETE]** Delete vacancy
    
      Additional Route: `<:companyId/vacancies/:vacancyId>`

    Response:
    ```
    {
        "message": "Vacancy deleted successfully"
    }
    ```

  * **[GET]** List Applicants
    
      Additional Route: `<:companyId/vacancies/:vacancyId/applicants>`

    Response:
    ```
    [
        {
            "id": "7f425468-44bc-4634-9230-34a919af1dd9",
            "full_name": "Arif",
            "email": "arif@gmail.com",
            "skill_one": "1",
            "skill_two": "1",
            "address": "123 Main Street",
            "profile_photo_url": "https://storage.googleapis.com/journey-bangkit/profile.png",
            "gender": "Male",
            "age": "30",
            "phone_number": "1234567890",
            "applied_at": "2023-06-01T08:01:05.908Z"
        }
    ]
    ```

---
* ### Vacancies ###
  URL Route: `http://127.0.0.1:8000/api/vacancies/`
  * **[GET]** Get All vacancy
    
    Response:
    ```
    {
    "status": "Success",
    "page": 1,
    "limit": 10,
    "totalVacancies": 1,
    "totalPages": 1,
    "vacancies": [
            {
                "id": "88fe943c-3b65-49a9-b789-ff4b7bb10315",
                "placement_address": "Lowongan Programmer",
                "description": "description",
                "sector": "asda",
                "created_at": "2023-06-01T07:59:04.938Z",
                "updated_at": "2023-06-01T07:59:04.938Z",
                "disability_name": "Blind",
                "deadline_time": "2023-05-29T09:14:30.000Z",
                "company_name": "PT Seribu"
            }
        ]
    }
    ```

  * **[GET]** Get Specific vacancy
  
    Additional Route: `<:id>`
    
    Response:
    ```
    {
      "status": "Success",
      "vacancy": {
          "id": "dfe9725b-0e45-4732-8e29-7091e41574c4",
          "placement_address": "string",
          "description": "description",
          "sector": "string",
          "created_at": "2023-05-31T10:12:45.820Z",
          "updated_at": "2023-05-31T10:12:45.820Z",
          "disability_name": "string",
          "deadline_time": "2023-05-29T09:14:30.000Z",
          "company_name": "string"
        }
    }
    ```

  * **[GET]** Get Popular Vacancy
  
    Additional Route: `<popular>`
    
    Response:
    ```
    {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 3,
      "results": [
            {
                "id": "6258a8da-4da8-41f2-8df8-865e9d34e22b",
                "placement_address": "Lowongan Programmer",
                "description": "description",
                "sector": "asda",
                "id_disability": "1",
                "deadline_time": "2023-05-29T09:14:30.000Z",
                "id_company": "d57e489e-fe28-4479-b3a8-fa2460f543bb",
                "created_at": "2023-06-01T09:13:28.182Z",
                "updated_at": "2023-06-01T09:13:28.182Z"
            }
        ]
    }
    ```

    * **[GET]** Get Latest Vacancy
  
    Additional Route: `<latest>`
    
    Response:
    ```
    {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 3,
      "results": [
            {
                "id": "88fe943c-3b65-49a9-b789-ff4b7bb10315",
                "placement_address": "Lowongan Programmer",
                "description": "description",
                "total_applicants": 1
            },
        ]
    }
    ```