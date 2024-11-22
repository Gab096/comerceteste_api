import Product from '#models/product'
import vine from '@vinejs/vine'

export const createOrderValidator = vine.compile(
  vine.object({
    addressId: vine.number(),
    total: vine.number(),
    products: vine.array(
      vine.object({
        category: vine.string(),
        deleted: vine.boolean(),
        description: vine.string(),
        id: vine.number(),
        imagePath: vine.string(),
        name: vine.string(),
        price: vine.number(),
      })
    ),
  })
)

export const updateOrderValidator = vine.compile(
  vine.object({
    addressId: vine.number(),
    total: vine.number().optional(),
    products: vine.array(vine.string()).optional(),
  })
)
