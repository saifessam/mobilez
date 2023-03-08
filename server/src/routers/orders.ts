import { Router } from 'express';
import readAll from '../functions/orders/read-all';
import readOne from '../functions/orders/read-one';
import create from '../functions/orders/create';
import update from '../functions/orders/update';
import remove from '../functions/orders/remove';

const ordersRouter = Router();

ordersRouter.get('/', readAll);
ordersRouter.post('/create', create);
ordersRouter.put('/update', update);
ordersRouter.delete('/remove', remove);
ordersRouter.get('/:id', readOne);

export default ordersRouter;