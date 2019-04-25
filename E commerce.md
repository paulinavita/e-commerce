**E commerce**



**Product Routes**

| Routes               | HTTP | Header(s) | Body                             | Response Success                         | Response Error   |
| -------------------- | ---- | --------- | -------------------------------- | ---------------------------------------- | ---------------- |
| products/            | GET  | None      | None                             | `Status code : 200`<br/>`dataTypes : []` | StatusCode : 400 |
| /products/:name      | POST | None      | `productName : String(required)` | `Status code : 200`<br/>`dataTypes : {}` | StatusCode : 400 |
| /products/delete/:id | POST | Token     | `productId : String(required)`   | `Status code : 200`<br/>`dataTypes : {}` | StatusCode : 400 |
|                      |      |           |                                  |                                          |                  |
|                      |      |           |                                  |                                          |                  |

**User  Routes**

| Routes          | HTTP | Header(s) | Body                                                         | Response Success                         | Response Error      |
| --------------- | ---- | --------- | ------------------------------------------------------------ | ---------------------------------------- | ------------------- |
| users/local     | POST | None      | username:String**(Required)**, <br>password:String**(Required)**,<br>email:String(**Required**) | `Status code : 200`<br/>`dataTypes : {}` | `Status code : 400` |
| users/google    | POST | None      | password:String**(Required)**,<br/>email:String(**Required**) | `Status code : 200`<br/>`dataTypes : {}` | `Status code : 400` |
| /users/register | POST | None      | username:String**(Required)**, password:String**(Required)**, email:String**(Required)** | `Status code : 200`<br/>`dataTypes : {}` | `Status code : 400` |
| /users/:id      | GET  | Token     | Id:String(**Required**)                                      | `Status code : 200`<br/>`dataTypes : {}` | `Status code : 400` |
|                 |      |           |                                                              |                                          |                     |

**Cart Routes**

| Routes | HTTP | Header(s) | Body                             | Response Success                         | Response Error                           | Description             |
| ------ | ---- | --------- | -------------------------------- | ---------------------------------------- | ---------------------------------------- | ----------------------- |
| carts/ | POST | Token     | `productName : String(required)` | `Status code : 200`<br/>`dataTypes : {}` | `Status code : 200`<br/>`dataTypes : {}` | Add item to user's card |
| carts/ | GET  | Token     | None                             | `Status code : 200`<br/>`dataTypes : []` | `Status code : 200`<br/>`dataTypes : {}` | Get user's cart         |

#### Usage

Make sure you have Node.js and npm installed in your computer, and then run `npm install`.

In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after a sign in / sign up action on the client-side.

Run `nodemon app.js` to start the server.

