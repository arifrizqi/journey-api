# Journey-API
Journey RestAPI
# How To Use
* ### Users ###
  URL Route: `http://127.0.0.1/api/users`
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
    "data": {
        "profile_photo_url": "string",
        "password": "string",
        "skill_one": "string",
        "skills_two": "string",
        "full_name": "string",
        "address": "string",
        "gender": "string",
        "disability": "string",
        "roleId": "int",
        "created_at": "int",
        "phone_number": "int",
        "email": "string",
        "age": "int"
      }
    }
    ```
  * **[POST]** Add New User 

    Request: 
    ```
    {
      "email": "string",
      "full_name": "string",
      "password": "string",
      "skill_one": "string",
      "skill_two": "string",
      "disability": "string",
      "address": "string",
      "profile_photo_url": "file",
      "gender": "string",
      "age": "int",
      "phone_number": "int"
    }
    ```
    Response:
    ```
    {
        "status": "Success",
        "message": "Pengguna berhasil ditambahkan",
        "id": "06c6ada9-4c28-4132-8d5c-408296b62973"
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
        "message": "Pengguna berhasil dihapus"
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
        "message": "Insert Successful"
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
        "message": "Company berhasil dihapus"
    }
    ```
