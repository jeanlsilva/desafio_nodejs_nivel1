const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  response.json(repositories);
  
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = repositories.findIndex(repository => repository.id === id);

  if(index < 0) {
    response.status(400).json('Repositório não encontrado');
  }

  const likes = repositories[index].likes;

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[index] = repository;

  response.json(repository);
  
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repository => repository.id === id);

  if(index < 0) {
    return response.status(400).json('Repositório não encontrado');
  }

  const repository = repositories[index];

  repositories.splice(index, 1);

  response.status(204).json('Usuário deletado com sucesso');

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repository => repository.id === id);

  if(index < 0) {
    response.status(400).json('Repositório não encontrdo');    
  }

  const {title, url, techs, likes} = repositories[index];

  const repository = {
    id,
    title, 
    url, 
    techs,
    likes: likes + 1
  }

  repositories[index] = repository;

  response.json(repository);
 
});

module.exports = app;
