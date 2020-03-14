const { Router } = require('express');
const healthController = require('./health.ctrl');

const router = Router();
router.get('/api/status', (req, res) => { res.json({ status: 'OK' }) } );
router.get('/ping', healthController.ping);
router.get('/version', healthController.getVersion);
router.get('/health', healthController.checkHealth);

module.exports = router;
