import { Router } from "express";
import { listarTarefas, tarefasPendentes, tarefasConcluidas, buscarPorId, adicionarTarefa, deletarTarefa, finalizarTarefa } from "../controllers/tarefasController.js"

const router = Router();

router.get("/", listarTarefas)

router.get("/pendentes", tarefasPendentes);

router.get("/concluidas", tarefasConcluidas);

router.get("/:id", buscarPorId);

router.post("/", adicionarTarefa);

router.patch("/:id/concluir", finalizarTarefa);

router.delete("/:id", deletarTarefa);

export default router;