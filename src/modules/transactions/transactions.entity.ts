import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../users/users.entity";


enum TransactionStatus {
    PENDING = 'pending',
    FINISHED = 'finished',
    CANCELED = 'canceled'
}

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

    @Column({
        type: 'enum',
        enum: TransactionStatus
    })
    status: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}