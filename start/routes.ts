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
const SessionController = () => import('../app/controllers/session_controller.js')
const AddressesController = () => import('../app/controllers/addresses_controller.js')
const OrdersController = () => import('../app/controllers/orders_controller.js')

router.group(() => {
  /*     router.get('', [ProductController, 'index'])
    router.get('/:id', [ProductController, 'show'])
    router.post('', [ProductController, 'store'])
    router.delete('/:id', [ProductController, 'destroy'])
    router.put('/:id', [ProductController, 'update']) */
  router.resource('/products', ProductController).apiOnly()
})

router
  .group(() => {
    router.post('', [SessionController, 'store'])
  })
  .prefix('/session')

router
  .group(() => {
    router.get('', [UsersController, 'index'])
    router.get('/:id', [UsersController, 'show'])
    router.post('', [UsersController, 'store'])
    router.delete('/:id', [UsersController, 'destroy'])
    router.put('/:id', [UsersController, 'update'])
  })
  .prefix('/users')

router
  .group(() => {
    router.get('', [AddressesController, 'index'])
    router.get('/:id', [AddressesController, 'show'])
    router.post('', [AddressesController, 'store'])
    router.delete('/:id', [AddressesController, 'destroy'])
    router.put('/:id', [AddressesController, 'update'])
  })
  .prefix('/adresses')

router
  .group(() => {
    router.get('', [OrdersController, 'index'])
    router.get('/:id', [OrdersController, 'show'])
    router.post('', [OrdersController, 'store'])
    router.delete('/:id', [OrdersController, 'destroy'])
    router.put('/:id', [OrdersController, 'update'])
  })
  .prefix('/orders')
