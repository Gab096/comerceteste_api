import Product from '#models/product'
import { createProductValidator, updateProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductController {
  async index({ request, response }: HttpContext) {
    const {
      page = 1,
      limit = 15,
      search,
      field = 'id',
      price,
      direction,
      category,
    } = request.only(['page', 'limit', 'category', 'price', 'search', 'field', 'direction'])
    try {
      const products = await Product.query()
        .where((builder) => {
          if (search) {
            builder.whereILike('name', `%${search}%`)
          }
          if (category) {
            builder.whereILike('category', `%${category}%`)
          }
          if (price) {
            builder.whereBetween('price', [0, price])
          }
        })
        .andWhere('deleted', false)
        .orderBy(field, direction)
        .paginate(page, limit)

      return response.ok(products)
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
      const payload = await createProductValidator.validate(data)

      const product = new Product()

      product
        .merge({
          ...payload,
        })
        .save()

      return response.ok({
        type: 'success',
        message: 'Cadastrado com sucesso',
        data: payload,
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
      const product = await Product.query()
        .where('id', params.id)
        .andWhere('deleted', false)
        .firstOrFail()

      product
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
      const payload = await updateProductValidator.validate(data)

      const product = await Product.query()
        .where('id', params.id)
        .andWhere('deleted', false)
        .firstOrFail()

      product
        .merge({
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
      const product = await Product.query()
        .where('id', params.id)
        .andWhere('deleted', false)
        .firstOrFail()
      return response.ok(product)
    } catch (error) {
      return response.badRequest({
        type: 'Error',
        message: 'Não foi consultar produto',
        error,
      })
    }
  }
}
