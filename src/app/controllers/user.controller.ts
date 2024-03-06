import { UserModel } from "../models";
import { AppContext, Controller, ControllerResponse } from "../types";
import { z } from 'zod'
import { createToken, decryptiString, encryptString } from "../utils/security.util";
import { validateData } from "../utils/v.util";

const loginInputSchema = z.object({
    phone: z.string(),
    password: z.string()
}).strict()
type LoginInput = z.infer<typeof loginInputSchema>;
const login: Controller = async (ctx: AppContext<LoginInput>): Promise<ControllerResponse> => {
    const body = ctx.body;
    validateData(loginInputSchema, body);
    const { phone, password: inputPassword } = body;
    const user = await UserModel.findOne({ where: { phone } });
    if (user === null) {
        return {
            status: 401,
            message: 'user does not exist'
        }
    }
    const { password, id, name, email } = user.toJSON();
    const decPass = decryptiString(password);
    if (decPass !== inputPassword) {
        return {
            status: 401,
            message: 'invalid password',
        }
    }
    const token = createToken({ id, name, email, phone });

    return {
        status: 200,
        message: 'Logged In',
        data: {
            token,
            user: {
                id,
                name,
                email,
                phone
            }
        }
    }
}


const registerInputSchema = z.object({
    phone: z.string(),
    password: z.string(),
    name: z.string().optional(),
    email: z.string().optional(),
}).strict()
type RegisterInput = z.infer<typeof registerInputSchema>;
const registerUser: Controller = async (ctx: AppContext<RegisterInput>): Promise<ControllerResponse> => {
    const body = ctx.body;
    validateData(registerInputSchema, body);

    const exists = await UserModel.findOne({ where: { phone: body.phone } });
    if (exists !== null) {
        return {
            status: 409,
            message: 'user with phone number already exists',
        }
    }

    const user = (await UserModel.create({
        phone: body.phone,
        password: encryptString(body.password),
        name: body.name?.toLowerCase().trim() ?? null,
        email: body.email?.toLowerCase().trim() ?? null
    })).toJSON();

    return {
        status: 201,
        message: 'user created',
        data: {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone
        }
    }
}

export const UserControllers = {
    login,
    registerUser
}