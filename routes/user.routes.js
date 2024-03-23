import express from 'express'
import { verifyJwt } from '../middlerwares/auth.middleware.js'
import { getUser } from '../controllers/user.controllers.js'

const router = express.Router()

router.get('/', verifyJwt, getUser)

export default router