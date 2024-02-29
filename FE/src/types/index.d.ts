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

interface baseSearchQuery extends paginationQuery {
    name: string;
}

interface responseOptionBase {
    limit: number,
}

//hoc
interface resize {
    width: number;
    height: number;
}

interface typeImageS3 {
    url: string,
    origin: string,
    name: string,
    is_delete?: boolean,
}