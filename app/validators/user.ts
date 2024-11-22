import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine.string().trim(),
    password: vine.string().trim(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().optional(),
    email: vine.string().trim().optional(),
    password: vine.string().trim().escape().optional(),
  })
)
