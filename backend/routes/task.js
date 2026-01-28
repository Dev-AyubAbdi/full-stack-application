import express from 'express'
import { login, register} from '../controllers/task.js'
import { validate } from '../middleware/validationZod.js';
import { userSchema } from '../Schema/userSchema.js';

const router = express.Router()

router.post('/', validate(userSchema), register)
router.post('/login',  login,) 


export default router;