import { Router } from 'express';

import usersRoutes from './users';
import postsRoutes from './posts';
import commentsRoutes from './comments';

const router = Router();

router.use('/users', usersRoutes)
router.use('/posts', postsRoutes)
router.use('/comments', commentsRoutes);

export default router;