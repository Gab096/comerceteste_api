import Address from '#models/address'
import Order from '#models/order'
import { createOrderValidator, updateOrderValidator } from '#validators/order'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrdersController {
  async index({ request, response }: HttpContext) {
    const {
      page = 1,
      limit = 15,
      search,
      field = 'id',
      direction,
    } = request.only(['page', 'limit', 'search', 'field', 'direction'])
    try {
      const orders = await Order.query()
        .where((builder) => {
          if (search) {
            builder.whereILike('name', `%${search}%`)
          }
        })
        .andWhere('deleted', false)
        .orderBy(field, direction)
        .paginate(page, limit)

      return response.ok(orders)
    } catch (error) {
      return response.badRequest({
        type: 'Error',
        message: 'Não foi consultar produtos',
        error,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()

      const { addressId, ...payload } = await createOrderValidator.validate(data)
      const order = new Order()

      const address = await Address.findBy({
        id: addressId,
      })

      if (!address) {
        throw new Error('Não existe esse endereço')
      }

      order.merge({
        userId: address?.userId,
        addressId,
        ...payload,
      })

      await order.save()

      await order.related('products').attach(payload.products.map((product) => product.id))

      const savedOrder = await Order.query().where('id', order.id).preload('products').firstOrFail()

      return response.ok({
        type: 'success',
        message: 'Cadastrado com sucesso',
        data: savedOrder,
      })
    } catch (error) {
      return response.badRequest({
        type: 'Bad request',
        message: 'Não foi possivel cadastrar',
        error,
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const order = await Order.query()
        .where('id', params.id)
        .andWhere('deleted', false)
        .firstOrFail()

      order
        .merge({
          deleted: true,
        })
        .save()

      return response.ok({
        type: 'success',
        message: 'Produto deletado com sucesso',
      })
    } catch (error) {
      return response.badRequest({
        type: 'Error',
        message: 'Não foi possível deletar produto',
        error,
      })
    }
  }

  async update({ request, params, response }: HttpContext) {
    try {
      const data = request.all()
      const { addressId, ...payload } = await updateOrderValidator.validate(data)

      const order = await Order.query()
        .where('id', params.id)
        .andWhere('deleted', false)
        .firstOrFail()

      order
        .merge({
          addressId,
          ...payload,
        })
        .save()

      return response.ok({
        type: 'success',
        message: 'Produto Atualizado com sucesso',
        data: payload,
      })
    } catch (error) {
      return response.badRequest({
        type: 'Bad request',
        message: 'Não foi possivel atualizar produto',
        error,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const order = await Order.query()
        .where('id', params.id)
        .andWhere('deleted', false)
        .firstOrFail()
      return response.ok(order)
    } catch (error) {
      return response.badRequest({
        type: 'Error',
        message: 'Não foi consultar produto',
        error,
      })
    }
  }
}
