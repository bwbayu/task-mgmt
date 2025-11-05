import { Router } from 'express';
import taskController from './task.controller.js';
const router = Router();

router.get('/', taskController.getAll);
router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

export default router;
