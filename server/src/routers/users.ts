import { Router } from 'express';
import readAll from '../functions/users/read-all';
import create from '../functions/users/create';
import update from '../functions/users/update';
import remove from '../functions/users/remove';
import authorize from '../functions/users/authorize';
import deauthorize from '../functions/users/deauthorize';
import readOne from '../functions/users/read-one';

const usersRouter = Router();

usersRouter.get('/', readAll);
usersRouter.post('/create', create);
usersRouter.put('/update', update);
usersRouter.delete('/remove', remove);
usersRouter.post('/authorize', authorize);
usersRouter.get('/deauthorize', deauthorize);
usersRouter.get('/:id', readOne);

export default usersRouter;