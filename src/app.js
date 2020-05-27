const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  
  const { id, title, url, techs} = request.body

  const repository = { id: uuid(), 
                      title, 
                      url, 
                      techs: [...techs], 
                      likes: 0 }

  repositories.push(repository);                    

  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const repository = { id, 
    title, 
    url, 
    techs: [...techs], 
    likes: 0 }

  const index = repositories.findIndex( repo => repo.id === id );
  
  if(index < 0) return response.json({ Error: "ID inválido"})

  repositories[index] =  repository;

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  const index = repositories.findIndex( repo => repo.id === id );
  
  if(index < 0) return response.json({ error: "ID inválido"})

  repositories.splice(index,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex( repo => repo.id === id );
  
  if(index < 0) return response.json({ Error: "ID inválido"})

  repositories[index].likes += 1;

  return response.send();

});

module.exports = app;
