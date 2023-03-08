import { Router } from 'express';
import readAll from '../functions/devices/read-all';
import readOne from '../functions/devices/read-one';
import create from '../functions/devices/create';
import update from '../functions/devices/update';
import remove from '../functions/devices/remove';
import authenticate from '../middlewares/authenticate';

const devicesRouter = Router();

devicesRouter.get('/', readAll);
devicesRouter.post('/create', authenticate, create);
devicesRouter.put('/update', authenticate, update);
devicesRouter.delete('/remove', authenticate, remove);
devicesRouter.get('/:id', readOne);

export default devicesRouter;