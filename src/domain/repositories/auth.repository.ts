import { Prisma } from "@prisma/client";
import { AuthDatasource } from "../dataSources/auth.datasource";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { AuthEntity } from "../entities/auth.entity";


export abstract class AuthRepository implements AuthDatasource {

    abstract create(createUserDto: RegisterUserDto,  prismaCliente?: Prisma.TransactionClient): Promise<AuthEntity>;

    abstract findByEmail(email: string): Promise<AuthEntity | null>;

    abstract findByPhone(phone:string): Promise<AuthEntity | null>

    abstract update(email: string): Promise<AuthEntity | null>;

    abstract findById(id: number): Promise<AuthEntity | null>;

    abstract delete(id: number): Promise<void>;

    abstract updatePassword(email: string, password: string): Promise<AuthEntity | null>;
}