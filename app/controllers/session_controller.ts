import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    try {
      return {
        type: 'bearer',
        value: token.value!.release(),
      }
    } catch (error) {
      return response.badRequest({
        type: 'Error',
        message: 'Não foi possível realizar sessão',
        error,
      })
    }
  }
}
