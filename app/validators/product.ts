import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    price: vine.number(),
    category: vine.enum(['laptop', 'cellphone', 'tablet']),
    imagePath: vine.string().trim().escape(),
    description: vine.string().trim().escape(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    price: vine.number().optional(),
    category: vine.enum(['laptop', 'cellphone', 'tablet']).optional(),
    imagePath: vine.string().trim().escape().optional(),
    description: vine.string().trim().escape().optional(),
  })
)
