import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare category: 'laptop' | 'cellphone' | 'tablet'

  @column()
  declare price: number

  @column({ columnName: 'imagePath' })
  declare imagePath: string

  @column()
  declare description: string

  @column({ serialize: (value) => Boolean(value) })
  declare deleted: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
