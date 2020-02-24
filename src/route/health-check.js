const { Router } = require('express');
const infoController = require('../controllers/info.ctrl');

const router = Router();
router.get('/api/status', (req, res) => { res.json({ status: 'OK' }) } );
router.get('/ping', infoController.ping);
router.get('/version', infoController.getVersion);
router.get('/health', infoController.checkHealth);

module.exports = router;
