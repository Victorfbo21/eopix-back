import { Column, CreateDateColumn, Entity, Index, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "../users/users.entity";



@Entity()
export default class Balance {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    value: string;

    @ManyToOne(() => User)
    @Index()
    @Column()
    owner: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}