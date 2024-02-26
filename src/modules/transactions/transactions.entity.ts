import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../users/users.entity";


enum TransactionStatus {
    PENDING = 'pending',
    FINISHED = 'finished',
    CANCELED = 'canceled'
}

export enum TransactionType {
    IN = 'IN',
    OUT = 'OUT',
    TRADE = 'TRADE'
}

@Entity()
export default class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "float"
    })
    value: number;

    @Column({
        type: "enum",
        enum: TransactionType
    })
    type: string;

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