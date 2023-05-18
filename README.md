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
        "profile_photo_url": "user.jpg",
        "password": "password user",
        "full_name": "user full name",
        "address": "cyty",
        "gender": "Male",
        "disability": "Color Blind",
        "roleId": 1,
        "created_at": 2313236355,
        "phone_number": 2313236355,
        "email": "cli@gmail.com",
        "age": 20
      }
    }
    ```
    
  
    
    
    
    
