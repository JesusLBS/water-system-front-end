import { SocioFormModel } from "../interfaces/payload.interface";
import { SocioResponseDTO } from "../interfaces/socio.interface";

export const mapSocioDetailToForm = (dto: SocioResponseDTO): SocioFormModel => {
    const { user, profile, address, waterTake } = dto
    return {
        user: {
            uid: user.uid,
            name: user.name ?? '',
            email: user.email ?? '',
            roleId: user.roleId
        },
        profile: {
            lastName: profile.lastName ?? '',
            secondLastName: profile.secondLastName ?? '',
            mobile: profile.mobile ?? '',
            birthdate: profile.birthdate ?? '',
            age: profile.age,
            totalDependents: profile.totalDependents ?? 0
        },
        address: {
            address: address.address ?? '',
            city: address.city ?? ''
        },
        waterTake: {
            waterTakeId: waterTake.waterTakeId,
            waterLineId: waterTake.waterLineId,
            waterLineName: waterTake.waterLineName,
            isSuspended: waterTake.isSuspended
        }
    }
}