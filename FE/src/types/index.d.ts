//base instance 
interface baseInstance {
    message: string,
    status: number,
    options?: responseOptionBase,
}

interface responseOptionBase {
    limit: number,
}

//hoc
interface resize {
    width: number;
    height: number;
}