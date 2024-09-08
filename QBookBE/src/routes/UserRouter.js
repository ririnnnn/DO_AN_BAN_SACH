const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const {
  authMiddleware,
  authUserMiddleware,
  isAuthorized,
} = require('../middleware/authMiddleware')

router.post('/sign-up', UserController.createUser)
router.post('/sign-in', UserController.loginUser)
router.post('/log-out', UserController.logOutUser)

router.delete('/delete-user/:id', authMiddleware, UserController.deleteUser)
router.get('/get-all-user', authMiddleware, UserController.getAllUser)
router.get(
  '/get-detail-user/:id',
  authUserMiddleware,
  UserController.getUserDatail
)
router.post('/refresh-token', UserController.refreshToken)
router.put('/refresh-token', UserController.refreshTokenAPI)
router.post('/delete-many', authMiddleware, UserController.deleteManyUser)
router.get('/get-count-user', authMiddleware, UserController.getCountUser)

router.route('').get(UserController.getUser)
router
  .route('/:id')
  .get(isAuthorized, UserController.getUserDatail)
  .put(isAuthorized, UserController.updateUser)
router.put('/change-password/:id', isAuthorized, UserController.changePassword)

module.exports = router
