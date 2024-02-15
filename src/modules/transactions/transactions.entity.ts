import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../users/users.entity";



@Entity()
export default class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    value: string;


    @ManyToOne(() => User)
    @Index()
    @Column()
    user_from: string;


    @ManyToOne(() => User)
    @Index()
    @Column()
    user_to: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}