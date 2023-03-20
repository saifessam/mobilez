import { Router } from 'express';
import create from '../functions/orders/create';
import readAll from '../functions/orders/read-all';
import readCartItems from '../functions/orders/read-cart-items';
import readOne from '../functions/orders/read-one';
import remove from '../functions/orders/remove';
import update from '../functions/orders/update';
import authenticate from '../middlewares/authenticate';

const ordersRouter = Router();

ordersRouter.get('/', readAll);
ordersRouter.post('/create', create);
ordersRouter.put('/update', update);
ordersRouter.delete('/remove', authenticate, remove);
ordersRouter.get('/cart/:id', authenticate, readCartItems);
ordersRouter.get('/:id', readOne);

export default ordersRouter;