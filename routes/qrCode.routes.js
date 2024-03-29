import express from 'express'
import { generateQrCode, getAllQrCodes, getQrCode, redirectQrCode, updateQrCode } from '../controllers/qrCode.conrollers.js'
import { verifyJwt } from '../middlerwares/auth.middleware.js';

const router = express.Router()

router.post('/',verifyJwt, generateQrCode);
router.get('/', verifyJwt, getAllQrCodes)
router.get('/:qrCodeId', verifyJwt, getQrCode)
router.get("/redirect/:qrCodeId", redirectQrCode);
router.patch("/:qrCodeId",verifyJwt, updateQrCode);

export default router