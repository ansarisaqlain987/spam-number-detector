import { UserModel } from "../models";
import { AppContext, Controller, ControllerResponse } from "../types";
import {z} from 'zod'
import { encryptString } from "../utils/security.util";
import { validateData } from "../utils/v.util";

const loginInputSchema = z.object({
    phone: z.string(),
    password: z.string()
}).strict()
type LoginInput = z.infer<typeof loginInputSchema>;
const login: Controller = (ctx: AppContext<LoginInput>): ControllerResponse => {    
    const body = ctx.body;
    validateData(loginInputSchema, body);
    return {
        status: 200,
        message: 'Logged In',
        data: []
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
    const valid = registerInputSchema.safeParse(body);
    if(!valid.success){
        return {
            status: 400,
            message: 'invalid request body',
            error: valid?.error?.issues
        }
    }

    const exists = await UserModel.findOne({where: {phone: body.phone}});
    if(exists !==null){
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