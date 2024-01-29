interface metadataAllUser extends baseInstance {
    metadata: UserState[]
}

interface state_reducer_manageUser {
    userList: UserState[],
    loading: boolean,
}