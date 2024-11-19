import Cart from '#models/cart'
import type { HttpContext } from '@adonisjs/core/http'

export default class CartsController {
  async store({ request, response }: HttpContext) {
    const data: Cart[] = request.body()
    try {
      const products = await Cart.createMany(data)
      return response.ok({
        type: 'succsses',
        message: 'Cadastrado com sucesso',
        data: products,
      })
    } catch (error) {
      return response.badRequest({
        type: 'Bad request',
        message: 'Não foi possivel cadastrar',
        error,
      })
    }
  }
}
