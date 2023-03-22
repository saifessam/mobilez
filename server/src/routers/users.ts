import { Router } from 'express';
import authorize from '../functions/users/authorize';
import deauthorize from '../functions/users/deauthorize';
import readAll from '../functions/users/read-all';
import readOne from '../functions/users/read-one';
import remove from '../functions/users/remove';
import update from '../functions/users/update';

const usersRouter = Router();

usersRouter.get('/', readAll);
usersRouter.put('/update', update);
usersRouter.delete('/remove', remove);
usersRouter.post('/authorize', authorize);
usersRouter.get('/deauthorize', deauthorize);
usersRouter.get('/:id', readOne);

export default usersRouter;