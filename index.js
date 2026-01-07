const express = require('express');
const { connectDB, sequelize } = require('./config/db');
require('dotenv').config();

const newsRoutes = require('./routes/newsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/news', newsRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="nl">
        <head>
            <meta charset="UTF-8">
            <title>API Documentatie</title>
        </head>
        <body>
            <h1>Web API Documentatie</h1>
            <p>Database driven API with node.js & express</p>
            <hr>
            
            <h2>Entity: News (api_newsposts)</h2>
            <ul>
                <li><strong>GET /api/news</strong> - List posts <br> 
                    <em>Params: ?limit=10&offset=0&search=titel</em></li>
                <li><strong>GET /api/news/:id</strong> - Details</li>
                <li><strong>POST /api/news</strong> - Add new <br>
                    <em>Body: { "title": string, "content": string, "category": string, "views": int }</em></li>
                <li><strong>PUT /api/news/:id</strong> - Update</li>
                <li><strong>DELETE /api/news/:id</strong> - Delete</li>
            </ul>

            <h2>Entity: Users (api_users)</h2>
            <ul>
                <li><strong>GET /api/users</strong> - List users</li>
                <li><strong>GET /api/users/:id</strong> - Details</li>
                <li><strong>POST /api/users</strong> - Nieuwe gebruiker toevoegen. <br>
                    <em>Body: { "firstName": string, "lastName": string, "email": string }</em></li>
                <li><strong>PUT /api/users/:id</strong> - Update</li>
                <li><strong>DELETE /api/users/:id</strong> - Delete</li>
            </ul>
        </body>
        </html>
    `);
});

const startServer = async () => {
    await connectDB();
    await sequelize.sync({ force: false });
    console.log("Db sync done");

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
};

startServer();