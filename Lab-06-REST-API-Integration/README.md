# Lab Sheet 6 — REST API Integration
Based on the PDF topic: Node.js + Express REST API without a database, with separate plain-JS and React clients and a Postman collection.

## Backend
```bash
cd server
npm install
# copy .env.example to .env if needed
npm start
```
Server defaults to `http://localhost:5000`. Demo API key is `local-demo-key`; change it in both client files and server environment before sharing beyond local learning.

## Plain JS client
Serve `client/` with VS Code Live Server. Do not open the HTML with a `file://` URL if the browser blocks requests.

## React client
```bash
cd client-react
npm install
npm run dev
```
Data is in memory and resets when the server restarts. For production, use real authentication, environment-based secrets, validation and a persistent database.
