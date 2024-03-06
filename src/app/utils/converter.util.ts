export const getNumberValueOrZero = (str: string | undefined): number => {
    try{
        return str && Number(str) || 0
    }catch(err){
        return 0;
    }
}

export const getBooleanValue = (str: string | undefined) => {
    if(str){
        return str === 'true'
    }
    return false;
}

export default {
    getNumberValueOrZero,
    getBooleanValue
}