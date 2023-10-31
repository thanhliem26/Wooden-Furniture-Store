interface responseToken extends baseInstance {
    metadata: responseMetadataToken
}

interface responseMetadataToken {
    user: responseUserToken,
    tokens: responseTokenToken
}

interface responseUserToken {
    id: number,
    fullName: string,
    email: string,
}

interface responseTokenToken {
    accessToken: string,
    refreshToken: string,
}

interface responseSingUp extends baseInstance {
    metadata: responseMetadataSingUp
}

interface responseMetadataSingUp {
    user: responseUserSingUp
}

interface responseUserSingUp {
    id: number,
    fullName: string,
    email: string,
}