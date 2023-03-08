import { Router } from 'express';
import readAll from '../functions/announcements/read-all';
import readOne from '../functions/announcements/read-one';
import create from '../functions/announcements/create';
import update from '../functions/announcements/update';
import remove from '../functions/announcements/remove';
import authenticate from '../middlewares/authenticate';

const announcementsRouter = Router();

announcementsRouter.get('/', authenticate, readAll);
announcementsRouter.post('/create', authenticate, create);
announcementsRouter.put('/update', authenticate, update);
announcementsRouter.delete('/remove', authenticate, remove);
announcementsRouter.get('/:id', authenticate, readOne);

export default announcementsRouter;