import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    price: vine.number(),
    imagePath: vine.string().trim().escape(),
    description: vine.string().trim().escape(),
  })
)
