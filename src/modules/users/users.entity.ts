import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

export enum UserTypeEnum {
    ADMIN = 'admin',
    USER = 'user'
}


@Entity()
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Index()
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column({
        type: 'enum',
        enum: UserTypeEnum
    })
    role: string;


    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}