const express = require('express');
const userRouter = express.Router();
const mapRouter = express.Router();
const reviewRouter = express.Router();
const storeRouter = express.Router();
const { userController, mapController, reviewController, storeController } = require('./controllers');

// userRouter
// Path: /user
userRouter.post('/', userController.common.post);
userRouter.get('/', userController.common.get);
userRouter.patch('/', userController.common.patch);
userRouter.delete('/', userController.common.delete);
// Path: /user/login
userRouter.get('/login', userController.login.get);
// Path: /user/pw-confirm
userRouter.get('/pw-confirm', userController.pwConfirm.get);
// Path: /user/refresh
userRouter.get('/refresh', userController.refresh.get);

// mapRouter
// Path: /map
mapRouter.get('/', mapController.common.get);
mapRouter.put('/', mapController.common.put);
// Path: /map/pin
mapRouter.get('/pin', mapController.pin.get);

// reviewRouter
// Path: /review
reviewRouter.post('/', reviewController.common.post);
reviewRouter.get('/', reviewController.common.get);
reviewRouter.patch('/', reviewController.common.patch);
// Path: /review/:uuid
reviewRouter.get('/:uuid', reviewController.uuid.get);
reviewRouter.delete('/:uuid', reviewController.uuid.delete);

// storeRouter
// Path: /store
storeRouter.get('/', storeController.common.get);
storeRouter.post('/', storeController.common.post);
storeRouter.put('/', storeController.common.put);
// Path: /store/:uuid
storeRouter.post('/:uuid', storeController.uuid.post);
storeRouter.delete('/:uuid', storeController.uuid.delete);
// Path: /store/my-list
storeRouter.get('/my-list', storeController.myList.get);

module.exports = { userRouter, mapRouter, reviewRouter, storeRouter };