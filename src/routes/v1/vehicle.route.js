const express = require('express');
const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleById,
  deleteVehicleById,
  getPosition,
  assignPosition,
  unassignPosistion,
} = require('../../controllers/vehicle.controller');

const router = express.Router();

router.route('/create').post(createVehicle);
router.route('/').get(getAllVehicles);
router
  .route('/:id')
  .get(getVehicleById)
  .patch(updateVehicleById)
  .delete(deleteVehicleById);
router
  .route('/:id/position')
  .get(getPosition)
  .put(assignPosition)
  .delete(unassignPosistion);

module.exports = router;