import type { Request, Response } from "express";
import type { Tarefa } from "../data/tarefas.js";
import { tarefas, gerarId } from "../data/tarefas.js";
import { buscarTarefaPorId, listar, listarPendentes, listarConcluidas, adicionar, finalizar, deletar } from "../service/tarefasService.js";

// Validador de ID
function validarID(id: number): boolean {
    return Number.isInteger(id) && id > 0;
}

export function listarTarefas(req: Request, res: Response) {
    const resultado = listar();
    return res.json(resultado);
}

export function tarefasPendentes(req: Request, res: Response) {
    const resultado = listarPendentes();
    return res.json(resultado);
}

// Exibir todas as tarefas CONCLUIDAS
export function tarefasConcluidas(req: Request, res: Response) {
    const resultado = listarConcluidas();
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

    const encontrada = buscarTarefaPorId(id);

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

   const resultado = adicionar(descricao);

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

    const resultado = finalizar(id);

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

    const resultado = deletar(id)

    if(resultado === false){
        return res.status(404).json ({
            mensagem: "Tarefa não encontrada."
        });
    }

    return res.json({
        mensagem: ("Item removido com sucesso!")
    }) 
}