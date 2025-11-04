import { Prisma, PrismaClient } from "@prisma/client";
import { AuthEntity, RegisterUserDto } from "../../domain";
import { AuthDatasource } from "../../domain/dataSources/auth.datasource";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { prisma } from "../../data/postgres/db";


export class AuthRepositoryImp implements AuthRepository {
    constructor(
        private readonly authDatasource: AuthDatasource
    ) {}

    async findByPhone(phone: string): Promise<AuthEntity | null> {
        return this.authDatasource.findByPhone(phone)
    }

    async create(createUserDto: RegisterUserDto, prismaCliente?: Prisma.TransactionClient ): Promise<AuthEntity> {
        if (prismaCliente) {
            return this.authDatasource.create(createUserDto, prismaCliente);
        }
        return this.authDatasource.create(createUserDto);
    }

    async findByEmail(email: string): Promise<AuthEntity | null> {
        return this.authDatasource.findByEmail(email);
    }

    async update(email: string): Promise<AuthEntity | null> {
        return this.authDatasource.update(email);
    }

    async findById(id: number): Promise<AuthEntity | null> {
        return this.authDatasource.findById(id);
    }

    async delete(id: number): Promise<void> {
        return this.authDatasource.delete(id);
    }

    async updatePassword(email: string, password: string): Promise<AuthEntity | null> {
        return this.authDatasource.updatePassword(email, password);
    }
}