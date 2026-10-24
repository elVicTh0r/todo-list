//Controller não executa a regra de negócio. Ele recebe a requisição, chama o Service e transforma o resultado em uma resposta HTTP.

import type { Request, Response } from "express";
import { TarefaService } from "../service/TarefaService.js";

//Criando instância do TarefasService
const service = new TarefaService();

// Validador de ID
function validarID(id: number): boolean {
    return Number.isInteger(id) && id > 0;
}

export function listarTarefas(req: Request, res: Response) {
    const resultado = service.listar();
    return res.json(resultado);
}

export function tarefasPendentes(req: Request, res: Response) {
    const resultado = service.listarPendentes();
    return res.json(resultado);
}

// Exibir todas as tarefas CONCLUIDAS
export function tarefasConcluidas(req: Request, res: Response) {
    const resultado = service.listarConcluidas();
    return res.json(resultado);
}

// Buscar tarefas por ID
export function buscarPorId(req: Request, res: Response) {
    const id = Number (req.params.id);

    if (!validarID(id)) {
        return res.status(400).json({
            mensagem: "ID inválido"
        });
    }

    const encontrada = service.buscarTarefaPorId(id);

    if(encontrada === undefined){
        return res.status(404).json ({
            mensagem: "Tarefa não encontrada"
        })
    }
    return res.json(encontrada);
};

// Adicionar nova tarefa
export function adicionarTarefa (req: Request, res: Response) {
    const descricao = req.body?.descricao;

    if(typeof descricao !== "string" || descricao.trim() === "" ) {
        return res.status(400).json({
            mensagem: "Descrição invalida"
        })
    }

   const resultado = service.adicionar(descricao);

    return res.status(201).json(resultado);
}

// Concluir uma tarafa
export function finalizarTarefa(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!validarID(id)) {
        return res.status(400).json({
            mensagem: "ID inválido"
        });
    }

    const resultado = service.concluirTarefa(id);

    if(resultado === undefined){
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        })
    }

    return res.json(resultado);
}

// Deletar uma tarefa
export function deletarTarefa(req: Request, res: Response){
    const id = Number(req.params.id);

    if (!validarID(id)) {
        return res.status(400).json({
            mensagem: "ID inválido"
        });
    }

    const resultado = service.deletarTarefa(id)

    if(resultado === false){
        return res.status(404).json ({
            mensagem: "Tarefa não encontrada."
        });
    }

    return res.json({
        mensagem: ("Item removido com sucesso!")
    }) 
}