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
      "description": "string",
      "employees": int,
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
      "employees": int,
      "id_sector": int,
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
        "id_disability": int,
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
        "id": "25f9a4af-d60b-46cd-bebe-a102c9ac91a7",
        "placement_address": "Lowongan Programmer",
        "description": "Lorem Impsum Dolor Sit Amet",
        "created_at": "2023-06-06T12:32:16.961Z",
        "updated_at": "2023-06-06T12:32:16.961Z",
        "disability_name": "Physical Disability",
        "deadline_time": "2023-05-29T09:14:30.000Z",
        "company_name": "PT Dinamika",
        "company_logo": "https://storage.googleapis.com/journey-bangkit/company.png"
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
        "id_disability": int,
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
                "id": "25f9a4af-d60b-46cd-bebe-a102c9ac91a7",
                "placement_address": "Lowongan Programmer",
                "description": "Lorem Impsum Dolor Sit Amet",
                "created_at": "2023-06-06T12:32:16.961Z",
                "updated_at": "2023-06-06T12:32:16.961Z",
                "disability_name": "Physical Disability",
                "deadline_time": "2023-05-29T09:14:30.000Z",
                "company_name": "PT Dinamika",
                "company_logo": "https://storage.googleapis.com/journey-bangkit/company.png"
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
          "id": "25f9a4af-d60b-46cd-bebe-a102c9ac91a7",
          "placement_address": "Lowongan Programmer",
          "description": "Lorem Impsum Dolor Sit Amet",
          "created_at": "2023-06-06T12:32:16.961Z",
          "updated_at": "2023-06-06T12:32:16.961Z",
          "disability_name": "Physical Disability",
          "deadline_time": "2023-05-29T09:14:30.000Z",
          "company_logo": "https://storage.googleapis.com/journey-bangkit/company.png",
          "company_name": "PT Dinamika"
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
      "totalItems": 1,
      "results": [
            {
                "id": "25f9a4af-d60b-46cd-bebe-a102c9ac91a7",
                "placement_address": "Lowongan Programmer",
                "description": "Lorem Impsum Dolor Sit Amet",
                "deadline_time": "2023-05-29T09:14:30.000Z",
                "id_company": "5f6bd662-82a1-4c5e-af5c-b16477d86b81",
                "created_at": "2023-06-06T12:32:16.961Z",
                "updated_at": "2023-06-06T12:32:16.961Z",
                "disability_name": "Physical Disability",
                "company_logo": "https://storage.googleapis.com/journey-bangkit/company.png",
                "total_applicants": 1
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
      "totalItems": 1,
      "results": [
            {
                "id": "25f9a4af-d60b-46cd-bebe-a102c9ac91a7",
                "placement_address": "Lowongan Programmer",
                "description": "Lorem Impsum Dolor Sit Amet",
                "deadline_time": "2023-05-29T09:14:30.000Z",
                "id_company": "5f6bd662-82a1-4c5e-af5c-b16477d86b81",
                "created_at": "2023-06-06T12:32:16.961Z",
                "updated_at": "2023-06-06T12:32:16.961Z",
                "disability_name": "Physical Disability",
                "company_logo": "https://storage.googleapis.com/journey-bangkit/company.png"
            }
        ]
    }
    ```