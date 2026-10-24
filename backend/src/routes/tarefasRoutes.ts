// Define os caminhos da API e direciona cada requisição HTTP para o Controller responsável.

import { Router } from "express";
import { listarTarefas, tarefasPendentes, tarefasConcluidas, buscarPorId, adicionarTarefa, deletarTarefa, finalizarTarefa } from "../controllers/tarefasController.js"

const router = Router();

router.post("/", adicionarTarefa);

router.get("/", listarTarefas)

router.get("/pendentes", tarefasPendentes);

router.get("/concluidas", tarefasConcluidas);

router.get("/:id", buscarPorId);

router.patch("/:id/concluir", finalizarTarefa);

router.delete("/:id", deletarTarefa);

export default router;