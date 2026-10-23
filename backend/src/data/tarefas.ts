export interface Tarefa {
    id: number;
    descricao: string;
    concluida: boolean;
}

export const tarefas: Tarefa[] = [
    {
        id: 1,
        descricao: "Estudar TyperScript",
        concluida: false
    },

    {
        id: 2,
        descricao: "Aprender Express",
        concluida: true
    }
]

let proximoId = 3;

export function gerarId(): number {
    return proximoId++;
}

export default tarefas;