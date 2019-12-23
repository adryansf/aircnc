const {Router} = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

//Controllers//
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectController = require('./controllers/RejectController');
//===========//

const routes = Router();
const upload = multer(uploadConfig);

//Sessions//
routes.post('/sessions',SessionController.store);
//========//

//Dashboard//
routes.get('/dashboard', DashboardController.show);
//=========//

//Spots//
routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'),SpotController.store);
//=====//

//Booking//
routes.post('/spots/:spot_id/bookings', BookingController.store)
routes.post('/bookings/:booking_id/approvals', ApprovalController.store)
routes.post('/bookings/:booking_id/rejections', RejectController.store)
//=======//

module.exports = routes;