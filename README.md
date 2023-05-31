# Journey-API
Journey RestAPI
# How To Use
* ### Users ###
  URL Route: `http://127.0.0.1:8000/api/users`
  * **[GET]** Get Specific Users
  
    Additional Route: `<string:id>`
    
    Request: 
    ```
    (Null)
    ```
    
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
  
    Additional Route: `<string:id>`
    
    Request:

    ```
    (null)
    ```

    Response:

    ```
    {
        "status": "Success",
        "message": "User successfully deleted"
    }
    ```
  * **[POST]** Apply Vacancy

    Additional Route: `</:userId/apply/:vacancyId> `


    Request: 
    ```
    (null)
    ```
    Response:
    ```
    {
        "message": "Job application successful"
    }
    ```


---
* ### Companies ###
  URL Route: `http://127.0.0.1:8000/api/companies`
  * **[GET]** Get Specific Company
  
    Additional Route: `<string:id>`
    
    Request: 
    ```
    (Null)
    ```
    
    Response:
    ```
    "status": "Success",
    "page": 1,
    "limit": 10,
    "totalCompanies": 11,
    "totalPages": 2,
    "companies": [
        {
            "id": "string",
            "name": "Company Name",
            "address": "Company Address",
            "city": "Company City",
            "province": "Company Province",
            "logo": "path/to/logo.png",
            "description": "Company Description",
            "employees": 100,
            "id_sector": "1",
            "email": "company@example.com",
            "password": "password",
            "roleId": 2
        }]
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
  * **[POST]** Add vacancy
    
      Additional Route: `</:companyId/vacancies>`

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
  
    Additional Route: `<string:id>`
    
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

---
* ### Vacancies ###
  URL Route: `http://127.0.0.1:8000/api/vacancies`
  * **[GET]** Get Specific vacancy
  
    Additional Route: `<string:id>`
    
    Request: 
    ```
    (Null)
    ```
    
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

    
  * **[PUT]** Edit Vacancy
  
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
        "message": "Update Successful"
    }
    ```

  * **[DELETE]** Delete Specific Vacancy
  
    Additional Route: `<string:id>`
    
    Request:

    ```
    (null)
    ```

    Response:

    ```
    {
        "status": "Success",
        "message": "Vacancy deleted successfully"
    }
    ```