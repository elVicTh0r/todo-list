// Executa as operações e regras de negócio da aplicação, utilizando os dados necessários e retornando o resultado ao Controller.

import { Tarefa } from "../models/Tarefa"

export class TarefaService {
    private tarefas: Tarefa[] = [];

    // Adicionar tarefa na lista.
    public adicionar(descricao: string): Tarefa {
        const tarefa = new Tarefa(descricao);
        this.tarefas.push(tarefa);
        return tarefa;
    }

    // Listar toda as tarefas | Uso [...] para criar uma cópia da lista em caso de manipulações futuras (Visando proteção).
    public listar(): Tarefa[] {
        return [...this.tarefas];
    }

    // Listar tarefas PENDENTES
    public listarPendentes(): Tarefa[] {
        return this.tarefas.filter(t => t.estaConcluida() === false);
    }

    // Listar tarefas CONCLUIDAS
    public listarConcluidas(): Tarefa[] {
        return this.tarefas.filter(t => t.estaConcluida() === true);
    }

    // Buscar tarefas por ID.
    public buscarTarefaPorId(id: number): Tarefa | undefined {
        return this.tarefas.find(t => t.getId() === id);
    }

    // Concluir uma tarefa
    public concluirTarefa(id: number): Tarefa | undefined{
        const encontrada = this.tarefas.find(t => t.getId() === id);

        if (encontrada === undefined){
            return undefined;
        }

        encontrada.concluir();

        return encontrada;
    }

    // Deletar tarefa
    public deletarTarefa(id: number): boolean{
        const indexTarefa = this.tarefas.findIndex(t => t.getId() === id);

        if(indexTarefa === -1){
            return false;
        }

        this.tarefas.splice(indexTarefa,1);

        return true;
    }

}