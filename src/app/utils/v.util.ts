
export const validateData = (schema: any, data: any) => {
    const valid = schema.safeParse(data);
    if(!valid.success){
        const error = {
            status: 400,
            message: 'invalid request body',
            error: valid?.error?.issues
        }
        throw new Error(JSON.stringify(error));
    }
    return valid
}