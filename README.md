## E-Commerce

#### List of basic routes:

| Route          | HTTP | Header(s) | Body                                | Description                                                  |
| -------------- | ---- | --------- | ----------------------------------- | ------------------------------------------------------------ |
| /registerAdmin | POST | none      | email: String<br />password: String | Create a user (role auto admin)<br />success:<br />(201), example: {"_id": String, "name": String, "email": String, "password": String, "role": String}<br />errors:<br />(500), error |
| /register      | POST | none      | email: String<br />password: String | Create a user (role auto user)<br />success:<br />(201), example: {"_id": String, "name": String, "email": String, "password": String, "role": String}<br />errors:<br />(500), error |
| /login         | POST | none      | email: String<br />password: String | Login and get token based on credentials<br />success:<br />(200), example: {"_id": String, "name": String, "email": String, "password": String, "role": String, "token": String}<br />errors:<br />(400), {message: 'Invalid email/password'}<br />(500), error |



#### List of user routes:

| Route              | HTTP   | Header(s)                                                    | Body                                                  | Description                                                  |
| ------------------ | :----- | :----------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| /users             | GET    | Authenticated:<br />(token),<br />Authorized:<br />(role: admin) | none                                                  | Get all users info (Admin only)<br />success:<br />(200), example: [{"_id": String, "name": String, "email": String, "password": String, "role": String}, {"_id": String, "name": String, "email": String, "password": String, "role": String}, etc]<br />errors:<br />(500), error |
| /users/:id/:userId | GET    | Authenticated:<br />(token)                                  | none                                                  | Get a single user info (Admin and authenticated member)<br />success:<br />(200), example: {"_id": String, "name": String, "email": String, "password": String, "role": String}<br />errors:<br />(404), example: {message: 'User not found'}<br />(500), error |
| /users/:id         | PUT    | Authenticated:<br />(token)                                  | name: String<br />email: String<br />password: String | Update a user with new info (admin and authenticated member)<br />success:<br />(200), example: {message: 'Updated'}<br />errors:<br />(404), example: {message: 'User not found'}<br />(500), error |
| /users/:id         | DELETE | Authenticated:<br />(token),<br />Authorized:<br />(role: admin) | none                                                  | Delete a user (admin only)<br />success:<br />(200), example: {message: 'Deleted'}<br />errors:<br />(404), example: {message: 'User not found'}<br />(500), error |



#### List of article routes:

| Route                    | HTTP   | Header(s)                                                    | Body                                                         | Description                                                  |
| ------------------------ | :----- | :----------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| /products                | GET    | Authenticated:<br />(token)                                  | none                                                         | Get all product<br />success:<br />(200), example: [{"name": String, "amount": Number, "price": Number, "pictureUrl": String}, {"name": String, "amount": Number, "price": Number, "pictureUrl": String}, etc]<br />errors:<br />(500), error |
| /products/:id/:productId | GET    | Authenticated:<br />(token)<br />Authorized:<br />(check isUser) | none                                                         | Get a single product info<br />success:<br />(200), example: {"name": String, "amount": Number, "price": Number, "pictureUrl": String}<br />errors:<br />(404), example: {message: 'Product not found'}<br />(500), error |
| /products                | POST   | Authenticated:<br />(token),<br />Authorized:<br />(role: admin) | name: String<br />amount: Number<br />price: Number<br />image: File | Create a product<br />success:<br />(201), example: {"name": String, "amount": Number, "price": Number, "pictureUrl": String}<br />errors:<br />(400), example: {"message": String}<br />(500), error |
| /products/:productId     | PUT    | Authenticated:<br />(token)<br />Authorized:<br />(role: admin) | name: String<br />amount: Number<br />price: Number<br />image: File | Update a product with new info<br />success:<br />(200), example: {"name": String, "amount": Number, "price": Number, "pictureUrl": String}<br />errors:<br />(404), example: {message: 'Product not found'}<br />(500), error |
| /products/:id/:productId | PATCH  | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | amount: Number                                               | Update amount of product<br />success:<br />(200), example: {"name": String, "amount": Number, "price": Number, "pictureUrl": String}<br />errors:<br />(404), example: {message: 'Product not found'}<br />(500), error |
| /products/:productId     | DELETE | Authenticated:<br />(token),<br />Authorized:<br />(role: admin) | none                                                         | Delete a product<br />success:<br />(200), example: {message: 'Product successfully deleted'}<br />errors:<br />(404), example: {message: 'Product not found'}<br />(500), error |



#### List of cart routes:

| Route             | HTTP  | Header(s)                                                    | Body                                             | Description                                                  |
| ----------------- | :---- | :----------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| /carts/:id        | GET   | Authenticated:<br />(token)                                  | none                                             | Get cart by user<br />success:<br />(200), example: {"product": Array, "userId": Object}<br />errors:<br />(500), error |
| /carts/:userId    | POST  | none                                                         | none                                             | Create a cart<br />success:<br />(200), example: {"product": Array, "userId": Object}<br />errors:<br />(400), example: {"message": String}<br />(500), error |
| /carts/add/:id    | PATCH | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | product: {"productId": String, "amount": Number} | Add a product to cart<br />success:<br />(201), example: {"product": Array, "userId": Object}<br />errors:<br />(404), example: {message: 'Product not found'}<br />(500), error |
| /carts/delete/:id | PUT   | Authenticated:<br />(token)<br />Authorized:<br />(check isUser) | productId: String                                | Remove a product from cart<br />success:<br />(200), example: {"product": Array, "userId": Object}<br />errors:<br />(404), example: {message: 'Cart not found'}<br />(500), error |



#### List of transaction routes:

| Route                            | HTTP | Header(s)                                                    | Body                                                         | Description                                                  |
| -------------------------------- | :--- | :----------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| /transactions                    | GET  | Authenticated:<br />(token)<br />Authorized:<br />(role: admin) | none                                                         | Get all transaction<br />success:<br />(200), example: [{"product": Array, "itemPrice": Number, "deliverPrice": Number, "totalPrice": Number, "status": String, "userId": {ObjectId}}, {"product": Array, "itemPrice": Number, "deliverPrice": Number, "totalPrice": Number, "status": String, "userId": {ObjectId}}, etc]<br />errors:<br />(500), error |
| /transactions/:id                | GET  | Authenticated:<br />(token)<br />Authorized:<br />(check isUser) | none                                                         | Get all transaction by user<br />success:<br />(200), example: {"product": Array, "itemPrice": Number, "deliverPrice": Number, "totalPrice": Number, "status": String, "userId": {ObjectId}}<br />errors:<br />(404), example: {message: 'Transaction not found'}<br />(500), error |
| /transactions/:id                | POST | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | product: Array<br />itemPrice: Number<br />deliverPrice: Number<br /><br />totalPrice: Number<br />user: {Object} | Create a transaction<br />success:<br />(201), example: {"product": Array, "itemPrice": Number, "deliverPrice": Number, "totalPrice": Number, "status": String, "userId": {ObjectId}}<br />errors:<br />(400), example: {"message": String}<br />(500), error |
| /transactions/:id/:transactionId | PUT  | Authenticated:<br />(token)<br />Authorized:<br />(check isUser) | status: String                                               | Update a transaction status(pending, send, done)<br />success:<br />(200), example: {"product": Array, "itemPrice": Number, "deliverPrice": Number, "totalPrice": Number, "status": String, "userId": {ObjectId}}<br />errors:<br />(404), example: {message: 'Transaction not found'}<br />(500), error |



### Link Deploy

Server:

<http://e-commerly-server.willyprayogo26.xyz/>



Client:

