# **Backend-Template with ExpressJS, MongoDB, TS & bun**

This is a simple template for a backend with express.js and connection to mongoDB. Furthermore is this template initialized with **bun** for better perfomance and it is completely written in **TypeScript** to make it more secure.

# Folder structure:
- config
- controller
- middleware
- models
- routes
- seeding
- services
- types

The folders are prefilled with default files. The default files includes routes for handling several user endpints like create a user and get user information.

# How to use it
Create .env file. The template also includes an template for an .env file with the preseted and used environment variables in this template.

Type in terminal
1.  npm i 
2.  npm start

# Used Dependencies in this template
<table>
    <tr>
        <th>Dependency</th>
        <th>Description</th>
        <th>Version</th>
    </tr>
    <tr>
        <td>bcrypt</td>
        <td>A library to help you hash passwords.</td>
        <td>^5.1.1</td>
    </tr>
    <tr>
        <td>bunrest</td>
        <td>A simple and intuitive REST API client for Node.js.</td>
        <td>^1.3.8</td>
    </tr>
    <tr>
        <td>cookie-parser</td>
        <td>Parse Cookie header and populate req.cookies</td>
        <td>^1.4.6</td>
    </tr>
    <tr>
        <td>cors</td>
        <td>Cross-Origin Resource Sharing (CORS) middleware</td>
        <td>^2.8.5</td>
    </tr>
    <tr>
        <td>dotenv</td>
        <td>Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.</td>
        <td>^16.4.5</td>
    </tr>
    <tr>
        <td>express</td>
        <td>Fast, unopinionated, minimalist web framework for node</td>
        <td>^4.19.2</td>
    </tr>
    <tr>
        <td>express-validator</td>
        <td>An express.js middleware for validator.js.</td>
        <td>^7.0.1</td>
    </tr>
    <tr>
        <td>jsonwebtoken</td>
        <td>Jsonwebtoken sign/verify etc</td>
        <td>^9.0.2</td>
    </tr>
    <tr>
        <td>mongoose</td>
        <td>MongoDB object modeling tool designed to work in an asynchronous environment.</td>
        <td>^8.2.3</td>
    </tr>
    <tr>
        <td>morgan</td>
        <td>HTTP request logger middleware for node.js</td>
        <td>^1.10.0</td>
    </tr>
    <tr>
        <td>multer</td>
        <td>Middleware for handling multipart/form-data, which is primarily used for uploading files.</td>
        <td>^1.4.5-lts.1</td>
    </tr>
    <tr>
        <td>nodemailer</td>
        <td>A simple module to send emails.</td>
        <td>^6.9.13</td>
    </tr>
    <tr>
        <td>url-encode-decode</td>
        <td>A simple url encode and decode library.</td>
        <td>^1.0.0</td>
    </tr>
</table>



