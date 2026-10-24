//Model representa os objetos da aplicação. Ele define seus atributos, comportamentos e validações, garantindo que cada objeto respeite suas próprias regras.

export class Tarefa {
    private static proximoId: number = 1;
    private readonly id: number;
    private descricao: string;
    private concluida: boolean;

    constructor (descricao:string){
        
        if(typeof descricao !== "string" || descricao.trim() === "") {
            throw new Error("Descrição Inválida !");
        } 
        this.descricao = descricao;

        this.id = Tarefa.proximoId;
        Tarefa.proximoId++;

        this.concluida = false;
    }

    public getId(): number{
        return this.id;
    }

    public getDescricao(): string{
        return this.descricao;
    } 

    public estaConcluida(): boolean{
        return this.concluida;
    }

    public concluir(): void{
        this.concluida = true;
    }
}

