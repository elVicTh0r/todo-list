import {Tarefa} from "./Tarefa"
import {FuncoesTarefa} from "../FuncoesTarefa"

    const tarefas: Tarefa[] = [];
    const funcoes = new FuncoesTarefa(tarefas);
    const tarefa1 = new Tarefa("Estudar Java");
    const tarefa2 = new Tarefa("Academia");

    funcoes.adicionarTarefa(tarefa1);
    funcoes.adicionarTarefa(tarefa2);
    funcoes.listarTarefa();
    funcoes.finalizarTarefa(tarefa2);
    funcoes.removerTarefa(tarefa1)
    funcoes.listarTarefa();