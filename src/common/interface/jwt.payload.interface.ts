import { UserType } from "../enums/userType.enum";

export class JwtPayload{
    email: string;
    userType: UserType
}