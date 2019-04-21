# E-Commerce
## URLs

Client URL : `http://localhost:8080`

Server URL : `http://localhost:3000`

## Notice On Running Server Testing

If you are going to run testing, please run the selected local testing database (in order to not delete the existing online database) as state on `app.js`. You only need to uncomment the desired section.

If you are going to view fully running application, please run the selected database as written in `app.js`  in order to check the online-stored data.

## Routes

| Route           | HTTP       | Headers(s)                                           | Body                                                         | Description                   | Success Case                                                 | Error Case                           |
| --------------- | ---------- | ---------------------------------------------------- | ------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------ | ------------------------------------ |
| `/products`| **GET**| None | none| Get all product list| Show all the product list in `array of object` ; with status code 200 | Status code 400 |
| `/products`| **POST**| An Authenticated JWT Token,<br> An admin role | name: String(**Required**),<br>description: String(**Required**),<br>image: File(**Required**),<br>stock: Number(**Required**),<br> price:Number(**Required**) | Create a new product | Show the created product in `object` :<br> { _id: ObjectId,<br> name: String,<br>description: String,<br/> price: String,<br>image: String,<br>stock: Number}<br> with status code 201 | Status code 400 |
| `/products/:id` | **GET** | None | None | Get a single product info | Show the product info in `object` :<br> { _id: ObjectId,<br> name: String,<br> price: Number,<br>description: String,<br/>image: String,<br>stock: Number}<br> with status code 200 | Status code 400 |
| `/products/:id` | **PATCH** | An Authenticated JWT Token,<br> An admin role | name: String,<br>price: String,<br>image: File,<br>stock: Number | Update a product information | Show the updated product's info in `object` :<br> { _id: ObjectId,<br> name: String,<br>, description: String,<br>price: Number,<br>image: String,<br>stock: Number} with status code 200 | Status code 400 |
| `/products/:id` | **DELETE** | An Authenticated JWT Token,<br> An admin role  | none | Delete an product | Show the deleted product in `object` :<br> { _id: ObjectId,<br> name: String,<br> description: String,<br> Price:Number<br> image: String,<br>stock: Number} with status code 200 | Status code 400 |
| `/carts`| **POST**| An Authenticated JWT Token | productId: ObjectId(**Required**),<br>userId: ObjectId(**Required**),<br>amount: (**Required**) | Create a new cart | Show the created cart in `object` :<br> { _id: ObjectId,<br>productId: ObjectId,<br>userId: ObjectId,<br>amount :Number }<br>  with status code 201 | Status code 400 |
| `/carts/:id`| **DELETE**| An Authenticated JWT Token<br>Cart Auth | none | Delete a cart | Show the deleted cart in `object` :<br> { _id: ObjectId,<br>productId: ObjectId,<br>userId: ObjectId,<br>amount :Number <br/> } with status code 200 | Status code 400 |
| `/carts/` | **GET** | An Authenticated JWT Token<br/> | None | Find carts based on userId | Show the deleted cart in `array`  with status code 200 | Status code 400 |
| `/carts/checkout` | **PUT** | An Authenticated JWT Token<br/>Cart Auth | Type : `$inc` | User checkout their card. | Show the deleted cart in `array`  with status code 200 | Status code 400 |
| `/transactions` | **GET** | An Authenticated JWT Token | None | Find all carts made by user | Show the cart in `array`  with status code 200 | Status code 400 |
| `/transactions` | **POST** | An Authenticated JWT Token | Carts: Array,<br/>userId: ObjectId(**Required**),
productId: (**Required**) | Find all carts made by user | Show the cart in `array`  with status code 200 | Status code 400 |
| `/users/` | **GET** | None | Carts: ,<br/>userId: ObjectId(**Required**),
productId: (**Required**) | Get Users | Show all user in `array` | Statusc coe 400 |
| `/users/post/` | **POST** | None | Email:String(**Required**)<br>Password:String(**Required**) | Register | Get and user details in `object` and status code 201 | Status code 400 |
| `/users/signin/local` | **POST** | None | Email:String(**Required**)<br/>Password:String(**Required**) |  | Get Token and user details in `object` and status code 200 | Status code 400 |

## Usage

Make sure you have Node.js and npm installed in your computer, and then run `npm install`.

In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after a successful sign in action on the client-side.

Run `nodemon app.js` to start the server.