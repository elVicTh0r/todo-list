import { Tarefa } from "./Tarefa";

export class FuncoesTarefa{

    private tarefas: Tarefa[];

    constructor(tarefas: Tarefa[]){
        this.tarefas = tarefas;
    }

    public adicionarTarefa(tarefa: Tarefa): void{
        if(this.tarefas.includes(tarefa)){
            throw new Error("Tarefa já adicionada");
        }
        this.tarefas.push(tarefa);
    }

    public listarTarefa(): void{
        for (const tarefa of this.tarefas) {
            console.log()
            console.log("=============================================")
            console.log("ID: " + tarefa.getId());
            console.log("Tarefa: " + tarefa.getDescricao());
            console.log("Finalizada: " + tarefa.getFinalizado());
            console.log("=============================================")
        }
    }

    public removerTarefa(tarefa: Tarefa): boolean{
        const indice = this.tarefas.findIndex(t => t.getId() === tarefa.getId())

        if(indice !== -1){
            this.tarefas.splice(indice,1);
            return true;
        }return false;
    }

    public finalizarTarefa(tarefa: Tarefa): boolean {
        const localizada = this.tarefas.find(tar => tar.getId() === tarefa.getId());

        if (localizada === undefined) {
            return false;
        }

        return localizada.finalizarTarefa();
    }
}