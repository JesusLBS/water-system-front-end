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
    mobile: string
    birthdate: string
    age: number | null
    totalDependents: number | null;
}

export interface AddressData {
    address: string
    city: string
}


export interface SocioFormModel {
    user: UserData
    profile: ProfileData
    address: AddressData
    waterTake: {
        waterTakeId: number;
        waterLineId: number;
        waterLineName: string;
        isSuspended: boolean;
    };
}