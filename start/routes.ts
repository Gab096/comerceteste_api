/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

const CartController = () => import('../app/controllers/carts_controller.js')

router.post('/cart', [CartController, 'store'])
