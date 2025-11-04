import { Prisma } from "@prisma/client";
import { prisma } from "../../data/postgres/db";
import { AuthEntity, CustomError, RegisterUserDto } from "../../domain";
import { AuthDatasource } from "../../domain/dataSources/auth.datasource";


export class AuthDatasourceImp implements AuthDatasource {

    async findByPhone(phone: string): Promise<AuthEntity | null> {
        
        
        const user = await prisma.user.findUnique({
            where: {
                phone: phone
            }
        });

        if (!user) return null
        
        return AuthEntity.fromObject(user)
    }

    async create(createUserDto: RegisterUserDto, prismaCliente: Prisma.TransactionClient = prisma): Promise<AuthEntity> {

        const user = await prismaCliente.user.create({
            data: createUserDto!
        });
        
        return AuthEntity.fromObject(user) // Placeholder return
    }

    async findByEmail(email: string): Promise<AuthEntity | null> {

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) return null;

        return   AuthEntity.fromObject(user)// Placeholder return
    }

    async findById(id: number): Promise<AuthEntity | null> {

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) return null;

        return   AuthEntity.fromObject(user)// Placeholder return
    }

    async update(email: string): Promise<AuthEntity | null> {
        const user = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                email_validate: true
            }
        });

        if (!user) return null;

        return   AuthEntity.fromObject(user)// Placeholder return
    }

    async delete(id: number): Promise<void> {
        const user = await prisma.user.delete({
            where: {
                id: id
            }
        });

        if (!user) throw CustomError.notFound("User not found");
    }

    async updatePassword(email: string, password: string): Promise<AuthEntity | null> {
        const user = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: password
            }
        });

        if (!user) return null;

        return   AuthEntity.fromObject(user)// Placeholder return
    }

    


}