const express = require('express');

const server = express();
server.use(express.json());

const cursos = [
   'NodeJS',
   'NextJS',
   'Prisma',
   'PostgreSQL'
]


// Create, criando um curso
server.post('/cursos', (req, res) => {
   const { name } = req.body;
   cursos.push(name);

   return res.json(cursos);
})

// Read, buscando todos os cursos
server.get('/cursos', (req, res) => {
   return res.json(cursos);
})

// Read, buscando um curso
server.get('/cursos/:index', (req, res) => {
   const { index } = req.params;

   return res.json(cursos[index])
})

// Update, atualizando um curso
server.put('/cursos/:index', (req, res) => {
   const { index } = req.params;
   const { name } = req.body;

   cursos[index] = name;

   return res.json(cursos);
})

// Delete, deletando um curso
server.delete('/cursos/:index', (req, res) => {
   const { index } = req.params;

   cursos.splice(index, 1);

   return res.json({ message: 'Curso deletado' });
})






server.listen(3333, () => console.log('Servidor OK'));
