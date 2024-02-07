//base instance 
interface baseInstance {
    message: string,
    status: number,
    options?: responseOptionBase,
}

interface baseDelete extends baseInstance {
    metadata: number[]
}

interface baseUpdate extends baseInstance {
    metadata: number[]
}

interface basePagination {
    current?: number,
    pageSize?: number,
}

interface paginationQuery {
    page?: number,
    limit?: number,
}

interface responseOptionBase {
    limit: number,
}

//hoc
interface resize {
    width: number;
    height: number;
}