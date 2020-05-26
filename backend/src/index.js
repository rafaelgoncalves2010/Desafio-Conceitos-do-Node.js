const express = require('express');

const app = express();

app.use(express.json());//para o projeto todo ler json nas requisicoes

const products = [];
var id = 0;

const validadeID = (request, response, next) => {
    const {id} = request.params;
     
    if(id < 0) return response.json({Error:"Não é permitido id negativo"})

    return next()
}

app.get('/projects', (req, res) => {
   
    return res.json(products);
});

app.post('/projects', (req, res) => {

    const { title , language } = req.body;
     id = id + 1
    const product = {
        id,
        title,
        language
    }

    if(product) products.push(product)

    return res.json(product);
});

app.put('/projects/:id', validadeID, (req, res) => {
    const {id} = req.params;
    const {title, language} = req.body;

    const product = {
        id,
        title,
        language 
     } 

    const index = products.findIndex( product =>  product.id === +id );

   if(index === -1) return res.status(400).json({ error: "Id não encontrado"});

    products[index] = product;
   return res.json(product);
});

app.delete('/projects/:id', (req, res) => {
    const {id} = req.params;
    const index = products.findIndex( product =>  product.id === +id );
    if(index === -1) return res.status(400).json({ error: "Id não encontrado"});

    products.splice(index,1);

    return res.status(204).send();
});

app.listen(3333);