//Server não executa regras de negócio. Ele configura e inicializa o Express, registra as rotas e deixa a API pronta para receber requisições HTTP.

import express from "express";
import tarefasRoutes from "./routes/tarefasRoutes.js"
import tarefas from "./data/tarefas.js";
import Tarefa from "./data/tarefas.js"

const app = express();

app.use(express.json());
app.use("/tarefas",tarefasRoutes );

app.listen(3000, () =>{
    console.log("Servidor rodando na porta 3000");
})