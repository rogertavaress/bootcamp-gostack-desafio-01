// Desafio 01
const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
var i = 0;

function numberReq(req, res, next) {
  i++;
  next();
  console.log(`Requisição de Numero: ${i}.`);
}

function checkID(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Precisa colocar o ID" });
  } else {
    for (proj of projects) {
      if (proj.id == id) {
        return next();
      }
    }
    return res.status(400).json({ error: "Não tem Projeto com esse ID" });
  }
}

//Metodo para Incluir um novo projeto
server.post("/projects", numberReq, (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  });

  return res.json(projects);
});

//Metodo para mostrar os projetos existentes
server.get("/projects", numberReq, (req, res) => {
  return res.json(projects);
});

//Metodo para alterar o titulo do projeto pelo ID
server.put("/projects/:id", numberReq, checkID, (req, res) => {
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
server.delete("/projects/:id", numberReq, checkID, (req, res) => {
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
server.post("/projects/:id/tasks", numberReq, checkID, (req, res) => {
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
