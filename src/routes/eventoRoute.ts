import { Router } from 'express';
import { createEvento, deleteEvento, getAllEventos, getEventoById, getEventosByTitulo, updateEvento } from '../controllers/eventoController';


const router = Router();

// Rotas CRUD
router.post('/', createEvento);          // Criar um evento
router.get('/listAll', getAllEventos);            // Obter todas os eventos
router.get('/getEvento/:id', getEventoById);     // Obter um evento específico
router.put('/update/:id', updateEvento);      // Atualizar um evento
router.delete('/delete/:id', deleteEvento);   // Deletar um evento
router.get('/getEventoByTitulo', getEventosByTitulo); // Buscar Evento por titulo

export default router;
