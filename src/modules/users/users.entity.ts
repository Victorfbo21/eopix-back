import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";


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

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}