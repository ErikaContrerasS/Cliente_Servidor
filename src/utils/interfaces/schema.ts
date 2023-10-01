export interface User {
    [x: string]: any
    id: String,
    name: String,
    lastname: String,
    email: String,
    createdBy: String,
    deactivationDate: Date,
    deactivationReason: String,
    country: Number,
    clearence: Promise<any>,
    role: String,
    permissions: [],
    status: String,
    employeenumber: String,
    externalUser: Boolean,
    profile: String,
    permissionsHogar: []
}

export interface newUser {
    name: String,
    lastname: String,
    email: String,
    password: String
    country: Number,
    region: String[],
    clearence: String[],
    role: String,
    permissions: [],
    createdBy: String,
    employeenumber: String,
    externalemploye: Boolean
    profile: String
    permissionsHogar: []
}

export interface newUserStatus {
    id: String,
    newStatus: String,
    createdBy: String,
    deactivationReason: String,
}