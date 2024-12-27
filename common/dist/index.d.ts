import z from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    username: string;
    password: string;
}, {
    email: string;
    name: string;
    username: string;
    password: string;
}>;
export declare const loginInput: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}>;
export declare const userUpdateInput: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    name?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    bio?: string | undefined;
    imageUrl?: string | undefined;
}, {
    email?: string | undefined;
    name?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    bio?: string | undefined;
    imageUrl?: string | undefined;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    content?: string | undefined;
}, {
    title?: string | undefined;
    content?: string | undefined;
}>;
export declare const createCommentInput: z.ZodObject<{
    body: z.ZodString;
}, "strip", z.ZodTypeAny, {
    body: string;
}, {
    body: string;
}>;
export declare const updateCommentInput: z.ZodObject<{
    body: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    body?: string | undefined;
}, {
    body?: string | undefined;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type LoginInput = z.infer<typeof loginInput>;
export type UserUpdateInput = z.infer<typeof userUpdateInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
export type CreateCommentInput = z.infer<typeof createCommentInput>;
export type UpdateCommentInput = z.infer<typeof updateCommentInput>;
