import { gerarId, tarefas } from "../data/tarefas.js";
import type { Tarefa } from "../data/tarefas.js"

// Exibir todas as tarefas
export function listar() {
    return (tarefas);
}

// Exibir todas as tarefas Pendentes
export function listarPendentes() {
    const pendentes = tarefas.filter(t => t.concluida === false);
    return pendentes;
}

// Exibir todas as tarefas CONCLUIDAS
export function listarConcluidas() {
    const concluida = (tarefas.filter(t => t.concluida === true))
    return (concluida);
}

// Buscar tarefas por ID
export function buscarTarefaPorId(id: number) {
    return tarefas.find(t => t.id === id);
}

// Adicionar Tarefa
export function adicionar(descricao: string): Tarefa {

     const novaTarefa: Tarefa = {
        id: gerarId(),
        descricao: descricao.trim(),
        concluida: false
    };

    tarefas.push(novaTarefa);

    return novaTarefa;
}

// Concluir tarefa
export function finalizar(id: number): Tarefa | undefined {

    const encontrado = tarefas.find(t => t.id === id);

    if(encontrado === undefined){
        return undefined;
    }

    encontrado.concluida = true;

    return encontrado;
}

// Deletar uma tarefa

export function deletar (id: number): boolean {
    const encontrado = tarefas.findIndex(t => t.id === id);

    if(encontrado === -1){
        return false;
    }

    tarefas.splice(encontrado,1);
    return true;
}
