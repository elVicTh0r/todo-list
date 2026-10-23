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