
interface CommentState {
    id: number,
    product_id: number,
    user_id: number,
    content: string,
    parent_id?: number | null,
    countChild_low: number,
    countChild_total: number,
    updatedAt: number,
    createdAt: number,
}

type UserComment = {
    avatar: string,
    avatar_support: string,
    fullName: string,
    id: number,
    role_user: string,
}

interface CommentStateReducer extends CommentState {
    user_comment : UserComment,
    commentChildren?: CommentStateReducer[],
    openChildren?: boolean;
}

interface typeAddListChildrenComment {
    children_list : CommentStateReducer[],
    id: number,
}

interface typePushChildrenComment {
    parent_id: number,
    commentChildren: CommentStateReducer
}

type setOpenCommentChildrenList = {
    id: number,
    show: boolean;
} 

type paramCreateComment = {
    product_id: number;
    user_id: number;
    content: string;
    parent_id?: number;
}

type paramGetListComment = {
    product_id: number;
}

type paramGetListChildrenComment = {
    parent_id: number;
}

type paramUpdateComment = {
    id: number,
    content: string,
    parent_id?: number | null,
}

type state_reducer_comments = {
    commentList: CommentStateReducer[],
    loading: boolean,
    total: number,
    idSelected: number | null,
}

interface typeMetadataComment {
    count: number,
    rows: CommentStateReducer[],
}

interface metadataComment extends baseInstance {
    metadata: typeMetadataComment
}

interface metadataChildrenCommentRp extends baseInstance {
    metadata: CommentStateReducer[]
}

interface metadataCommentRp extends baseInstance {
    metadata: CommentState
}