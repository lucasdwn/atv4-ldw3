import { Request, Response } from 'express';
import { Evento } from '../models/eventoModel';
import mongoose from 'mongoose';

// Criar Evento
export const createEvento = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { titulo, descricao, data, local } = req.body;

        if (!titulo) {
            return res.status(404).json({ message: 'Erro ao criar a evento', error: 'Titulo é obrigatório' });
        }

        if (!local) {
            return res.status(404).json({ message: 'Erro ao criar a evento', error: 'Local é obrigatório' });
        }

        if (!data) {
            return res.status(404).json({ message: 'Erro ao criar a evento', error: 'Data é obrigatória' });
        }


        const novoEvento = new Evento({ titulo, descricao, data, local });
        const eventoSalvo = await novoEvento.save();

        return res.status(201).json(eventoSalvo);
    } catch (error: any) {
        return res.status(500).json({ message: 'Erro ao criar evento', error: error.message });
    }
};

// Buscar Todos os Eventos
export const getAllEventos = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const eventos = await Evento.find();
        return res.status(200).json(eventos);
    } catch (error: any) {
        return res.status(500).json({ message: 'Erro ao buscar eventos', error: error.message });
    }
};

// Buscar Evento por ID
export const getEventoById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Erro ao buscar evento", error: "ID inválido" });
        }

        const evento = await Evento.findById(id);
        if (!evento) return res.status(404).json({ message: "Erro ao buscar evento", error: 'Evento não encontrado' });

        return res.status(200).json(evento);
    } catch (error: any) {
        return res.status(500).json({ message: 'Erro ao buscar evento', error: error.message });
    }
};

// Atualizar Evento
export const updateEvento = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Erro ao atualizar evento", error: "ID inválido" });
        }

        const eventoAtualizado = await Evento.findByIdAndUpdate(id, updates, { new: true });
        if (!eventoAtualizado) return res.status(404).json({ message: 'Erro ao atualizar evento', error: "Evento não encontrado" });

        return res.status(200).json(eventoAtualizado);
    } catch (error: any) {
        return res.status(500).json({ message: 'Erro ao atualizar evento', error: error.message });
    }
};

// Excluir Evento
export const deleteEvento = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Erro ao deletar evento", error: "ID inválido" });
        }

        const eventoDeletado = await Evento.findByIdAndDelete(id);
        if (!eventoDeletado) return res.status(404).json({ message: 'Erro ao deletar evento', error: "Evento não encontrado" });

        return res.status(200).json({ message: "Evento excluído com sucesso" });
    } catch (error: any) {
        return res.status(500).json({ message: 'Erro ao deletar evento', error: error.message });
    }
};

// Buscar Evento por titulo
export const getEventosByTitulo = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { titulo } = req.query;
  
      if (!titulo || typeof titulo !== 'string') {
        return res.status(400).json({ message: 'Erro ao buscar eventos', error: "O parâmetro 'titulo' é obrigatório e deve ser uma string" });
      }
  
      // Busca parcial usando regex
      const eventos = await Evento.find({ titulo: { $regex: titulo, $options: 'i' } });
  
      if (eventos.length === 0) {
        return res.status(404).json({ message: 'Erro ao buscar eventos', error: "Nenhum evento encontrado com o título informado" });
      }
  
      return res.status(200).json(eventos);
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro ao buscar eventos', error: error.message });
    }
  };
