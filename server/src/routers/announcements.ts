import { Router } from 'express';
import create from '../functions/announcements/create';
import readAll from '../functions/announcements/read-all';
import readOne from '../functions/announcements/read-one';
import remove from '../functions/announcements/remove';
import update from '../functions/announcements/update';
import authenticate from '../middlewares/authenticate';

const announcementsRouter = Router();

announcementsRouter.get('/', readAll);
announcementsRouter.post('/create', authenticate, create);
announcementsRouter.put('/update', authenticate, update);
announcementsRouter.delete('/remove', authenticate, remove);
announcementsRouter.get('/:id', readOne);

export default announcementsRouter;