import z from "zod";


export const signupInput = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    username: z.string().min(1),
    password: z.string().min(8),
})

export const loginInput = z.object({
    email: z.string().email().optional(),
    username: z.string().min(1).optional(),
    password: z.string().min(8),
})

export const userUpdateInput = z.object({
    email: z.string().email().optional(),
    name: z.string().min(1).optional(),
    bio: z.string().min(1).optional(),
    imageUrl: z.string().min(1).optional(),
    username: z.string().min(1).optional(),
    password: z.string().min(8).optional(),
})

export const createBlogInput = z.object({
    title: z.string().min(1),
    content: z.string().min(1)
})

export const updateBlogInput = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
})

export const createCommentInput = z.object({
    body: z.string().min(1),
})

export const updateCommentInput = z.object({
    body: z.string().min(1).optional(),
})

export type SignupInput = z.infer<typeof signupInput>
export type LoginInput = z.infer<typeof loginInput>
export type UserUpdateInput = z.infer<typeof userUpdateInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type CreateCommentInput = z.infer<typeof createCommentInput>
export type UpdateCommentInput = z.infer<typeof updateCommentInput>