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

//Metodo para Incluir um novo projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  });

  return res.json(projects);
});

//Metodo para mostrar os projetos existentes
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Metodo para alterar o titulo do projeto pelo ID
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  for (proj of projects) {
    if (proj.id == id) {
      proj.title = title;
    }
  }

  return res.json(projects);
});

//Metodo deletar projeto
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  let index = 0;

  for (proj of projects) {
    if (proj.id == id) {
      projects.splice(index, 1);
    }
    index++;
  }

  return res.json(projects);
});

//Adicionar Tasks
server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let index = 0;

  for (proj of projects) {
    if (proj.id == id) {
      proj.tasks.push(title);
    }
    index++;
  }

  return res.json(projects);
});

server.listen(3000);
