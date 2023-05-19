# Journey-API
Journey RestAPI
# How To Use
* ### Users ###
  URL Route: `http://127.0.0.1:8000/users/`
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
      "disability": "string",
      "address": "string",
      "profile_photo_url": "string",
      "gender": "string",
      "age": "int",
      "phone_number": "int",
      "created_at": "int",
      "roleId": "int"
    }
    ```
    Response:
    ```
    {
      "status": "Success",
      "id": "IzLlBEnRrtB4wns8iG17"
    }
    ```

  * **[PUT]** Edit User
  
    Request:
    ```
    {
      "email": "string",
      "full_name": "string",
      "disability": "string",
      "address": "string",
      "profile_photo_url": "string",
      "gender": "string",
      "age": "int",
      "phone_number": "int"
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
      "status": "success"
    }
    ```
---
* ### Companyies ###
  URL Route: `http://127.0.0.1:8000/companies/`
  * **[GET]** Get Specific Company
  
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
        "empolyees": "int",
        "password": "string",
        "address": "string",
        "province": "string",
        "city": "string",
        "roleId": "int",
        "logo": "string",
        "sector": "string",
        "email": "string",
        "desc": "string",
        "name": "string"
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
      "logo": "string",
      "desc": "string",
      "empolyees": "int",
      "sector": "string",
      "email": "string",
      "password": "string",
      "roleId": : "int"
    }
    ```
    Response:
    ```
    {
      "status": "Success",
      "id": "IzLlBEnRrtB4wns8iG17"
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
      "logo": "string",
      "desc": "string",
      "empolyees": "int",
      "sector": "string",
      "email": "string",
      "password": "string"
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
      "status": "success"
    }
    ```
    
