// Desafio 01
const express = require("express");

const server = express();

server.use(express.json());

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Metodo: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

const projects = [];

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  });

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;

  return res.json(projects);
});

server.listen(3000);
