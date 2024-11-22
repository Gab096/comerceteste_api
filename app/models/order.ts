import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Product from './product.js'
import User from './user.js'
import Address from './address.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare addressId: number

  @column()
  declare total: number

  @column({ serialize: (value) => Boolean(value) })
  declare deleted: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Product, {
    pivotTable: 'orders_products',
    pivotForeignKey: 'order_id',
    pivotRelatedForeignKey: 'product_id',
    pivotTimestamps: true,
  })
  declare products: ManyToMany<typeof Product>

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @hasOne(() => Address)
  declare address: HasOne<typeof Address>
}
