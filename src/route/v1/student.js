const { Router } = require('express');
const studentController = require('../../controllers/student.ctrl');

const router = Router();
router.post('/api/v1/student', studentController.createOne);
router.get('/api/v1/student/:_id', studentController.findOne);
router.put('/api/v1/student/:_id', studentController.updateOne);
router.delete('/api/v1/student/:_id', studentController.deleteOne);

module.exports = router;
