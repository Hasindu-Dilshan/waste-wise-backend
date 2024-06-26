const express = require('express');
const {
	getAllVehicles,
	getVehicleById,
	updateVehicleById,
	deleteVehicleById,
	getPosition,
	assignPosition,
	unassignPosistion,
	unassignDriver,
} = require('../../controllers/vehicle.controller');

const router = express.Router();

router.route('/').get(getAllVehicles);
router
	.route('/:id')
	.get(getVehicleById)
	.patch(updateVehicleById)
	.delete(deleteVehicleById);
router.route('/:id/unassign-driver').delete(unassignDriver);
router
	.route('/:id/position')
	.get(getPosition)
	.put(assignPosition)
	.delete(unassignPosistion);

module.exports = router;
