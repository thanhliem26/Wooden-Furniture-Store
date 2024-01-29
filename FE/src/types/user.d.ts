
interface UserState {
    id: number,
    fullName: string,
    email: string,
    address: string,
    dateOfBirth: string,
    phoneNumber: string,
    role_user: string,
    sex: string,
    deleteFlg: number,
}
interface metadataUser extends baseInstance{
    metadata: UserState
}

interface infoUser {
    id: number,
    fullName: string,
    email: string,
}

interface formDataSingUp {
    fullName: string,
    email: string,
    password: string,
    re_password: string,
}

interface formDataSingIn {
    email: string,
    password: string,
}

