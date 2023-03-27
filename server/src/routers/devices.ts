import { Router } from 'express';
import create from '../functions/devices/create';
import readAll from '../functions/devices/read-all';
import readOne from '../functions/devices/read-one';
import remove from '../functions/devices/remove';
import update from '../functions/devices/update';
import authenticate from '../middlewares/authenticate';

const devicesRouter = Router();

devicesRouter.get('/:limit', readAll);
devicesRouter.post('/create', authenticate, create);
devicesRouter.put('/update', authenticate, update);
devicesRouter.delete('/remove', authenticate, remove);
devicesRouter.get('/:id', readOne);

export default devicesRouter;