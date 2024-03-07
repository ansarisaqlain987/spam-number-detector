import { models } from "../models";
import { Controller, Response, Request } from "../types";
import { z } from 'zod'
import { createToken, decryptiString, encryptString } from "../utils/security.util";
import { validateData } from "../utils/v.util";

const loginInputSchema = z.object({
    phone: z.string(),
    password: z.string()
}).strict()
type LoginInput = z.infer<typeof loginInputSchema>;
const login: Controller = async (request: Request<LoginInput>, response: Response): Promise<Response> => {
    const { body } = request;
    validateData(loginInputSchema, body);
    const { phone, password: inputPassword } = body;
    const user = await models.user.findOne({ where: { phone } });
    if (user === null) {
        return response.status(401).send({message: 'user does not exist'});
    }
    const { password, id, name, email } = user.toJSON();
    const decPass = decryptiString(password);
    if (decPass !== inputPassword) {
        return response.status(401).send({
            message: 'invalid password',
        });
    }
    const token = createToken({ id, name, email, phone });

    return response.status(200).send({
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
    })
}


const registerInputSchema = z.object({
    phone: z.string(),
    password: z.string(),
    name: z.string().optional(),
    email: z.string().optional(),
}).strict()
type RegisterInput = z.infer<typeof registerInputSchema>;
const registerUser: Controller = async (request: Request<RegisterInput>, response: Response): Promise<Response> => {
    const {body} = request;
    validateData(registerInputSchema, body);

    const exists = await models.user.findOne({ where: { phone: body.phone } });
    if (exists !== null) {
        return response.status(409).send({
            message: 'user with phone number already exists',
        })
    }

    const user = (await models.user.create({
        phone: body.phone,
        password: encryptString(body.password),
        name: body.name?.toLowerCase().trim() ?? null,
        email: body.email?.toLowerCase().trim() ?? null
    })).toJSON();

    return response.status(201).send({
        message: 'user created',
        data: {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone
        }
    })
}

export const UserControllers = {
    login,
    registerUser
}