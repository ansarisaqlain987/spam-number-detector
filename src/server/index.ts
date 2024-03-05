import { APP } from "../app/app";

const DEFAULT_PORT = 8000
const serielizePort = (port: string | undefined): number => {
    try{
        return (port && Number(port)) || DEFAULT_PORT;
    }catch(err){
        return DEFAULT_PORT
    }
}

const PORT = serielizePort(process.env.PORT)

APP.listen(PORT, () => {
    console.log("Server started at port: ", PORT);
});