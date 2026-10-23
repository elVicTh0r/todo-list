export class Tarefa{
    private static contador: number = 1;
    private id: number;
    private descricao: string;
    private finalizado: boolean = false;

    constructor(descricao: string){
        if(!descricao || descricao.trim() === ""){
            throw new Error("Tarefa não pode ser vazia");
        } this.descricao = descricao.trim();
        this.id = Tarefa.contador ++;
    }

    public getId(): number{
        return this.id;
    }

    public getDescricao(): string{
        return this.descricao;
    }

    public getFinalizado(): boolean{
        return this.finalizado;
    }

    public finalizarTarefa(): boolean {
        if(this.finalizado === true){
            console.log("Esta tarefa já foi finalizada.");
            return false;
        }
        this.finalizado = true;
        return true;
    }
}