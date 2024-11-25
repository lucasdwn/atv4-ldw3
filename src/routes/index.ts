import { Router } from 'express';
import Evento from "./eventoRoute";

const router = Router();

router.get('/hello', (req, res) => {
  res.send('Hello, World!');
});
router.use('/evento', Evento);


export default router;
