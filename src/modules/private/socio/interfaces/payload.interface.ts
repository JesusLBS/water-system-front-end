export interface PayloadRoot {
    userData: UserData
    profileData: ProfileData
    addressData: AddressData
}

export interface UserData {
    uid: string
    name: string
    email: string
    roleId: number
}

export interface ProfileData {
    lastName: string
    secondLastName: string
    mobile: number
    birthdate: string
}

export interface AddressData {
    address: string
    city: string
}
