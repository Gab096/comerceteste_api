import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('category', ['laptop', 'cellphone', 'tablet']).notNullable()
      table.string('name').notNullable()
      table.integer('price').notNullable()
      table.string('imagePath')
      table.text('description')
      table.boolean('deleted').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
