import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ request, response }: HttpContext) {
    const {
      page = 1,
      limit = 15,
      search,
      field = 'id',
      direction,
    } = request.only(['page', 'limit', 'search', 'field', 'direction'])
    try {
      const users = await User.query()
        .where((builder) => {
          if (search) {
            builder.whereILike('name', `%${search}%`)
          }
        })
        .andWhere('deleted', false)
        .orderBy(field, direction)
        .paginate(page, limit)

      return response.ok(users)
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
      const payload = await createUserValidator.validate(data)

      const user = new User()

      user
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
      const user = await User.query()
        .where('id', params.id)
        .andWhere('deleted', false)
        .firstOrFail()

      user
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
      const payload = await updateUserValidator.validate(data)

      const user = await User.query()
        .where('id', params.id)
        .andWhere('deleted', false)
        .firstOrFail()

      user
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
      const user = await User.query()
        .where('id', params.id)
        .andWhere('deleted', false)
        .firstOrFail()
      return response.ok(user)
    } catch (error) {
      return response.badRequest({
        type: 'Error',
        message: 'Não foi consultar produto',
        error,
      })
    }
  }
}
