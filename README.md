# Job listing backend

This is a simple backend for a job listing application. It is written in javaScript and uses express.js as the server framework. The data is stored in a MongoDB database.

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Make changes to the `.env` file to match your database configuration.

4. env expample

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/job-listing
JWT_SECRET=secret // you can use any string
SALT_ROUNDS=10 // you can use any number
JWT_EXPIRY=1d // you can use any string
```

5. You can use the nodemon to run the server.

```zsh
nodemon src/index.js
```

Or you can use the node command to run the server. `This only works in the latest node versions.`

```zsh
node --watch src/index.js
```

## Usage

The server has the following routes:

1. `GET /jobs` - This route returns all the jobs in the database.
   1. `GET /jobs/:id` - This route returns a single job with the specified id.
   2. `POST /jobs` - This route creates a new job in the database.
   3. `PUT /jobs/:id` - This route updates a job with the specified id.
   4. `DELETE /jobs/:id` - This route deletes a job with the specified id.
   5. `GET /jobs?title=jobTitle` - This route searches for a job with the specified title.
   6. `GET /jobs?title=joTitle&skills=html,js,react` - This route searches for a job with the specified jobTitle and skills.
      s
