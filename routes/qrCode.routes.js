import express from 'express'
import { generateQrCode, redirectQrCode } from '../controllers/qrCode.conrollers.js'

const router = express.Router()

router.post('/', generateQrCode)
router.get("/redirect/:qrCodeId", redirectQrCode);

export default router