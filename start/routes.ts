/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

const ProductController = () => import('../app/controllers/products_controller.js')
const UsersController = () => import('../app/controllers/users_controller.js')
const AddressesController = () => import('../app/controllers/addresses_controller.js')
const OrdersController = () => import('../app/controllers/orders_controller.js')

router.get('/products', [ProductController, 'index'])
router.get('/products/:id', [ProductController, 'show'])
router.post('/products', [ProductController, 'store'])
router.delete('/products/:id', [ProductController, 'destroy'])
router.put('/products/:id', [ProductController, 'update'])

router.get('/users', [UsersController, 'index'])
router.get('/users/:id', [UsersController, 'show'])
router.post('/users', [UsersController, 'store'])
router.delete('/users/:id', [UsersController, 'destroy'])
router.put('/users/:id', [UsersController, 'update'])

router.get('/adresses', [AddressesController, 'index'])
router.get('/adresses/:id', [AddressesController, 'show'])
router.post('/adresses', [AddressesController, 'store'])
router.delete('/adresses/:id', [AddressesController, 'destroy'])
router.put('/adresses/:id', [AddressesController, 'update'])

router.get('/orders', [OrdersController, 'index'])
router.get('/orders/:id', [OrdersController, 'show'])
router.post('/orders', [OrdersController, 'store'])
router.delete('/orders/:id', [OrdersController, 'destroy'])
router.put('/orders/:id', [OrdersController, 'update'])
