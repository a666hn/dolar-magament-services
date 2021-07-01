import { BANK_ENTITY } from 'src/dictionaries/constant.dictionary';
import {
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { MapBankAccountEntity } from './map-bank-account.entity';

@Entity(BANK_ENTITY)
@Index('bank_id_name_code_idx', ['id', 'bankCode', 'bankName'], {
    unique: true,
})
export class BankEntity {
    @PrimaryGeneratedColumn({
        type: 'int4',
    })
    id: number;

    @Column({
        name: 'code',
        unique: true,
        nullable: true,
    })
    bankCode: string;

    @Column({
        type: 'varchar',
        name: 'bank_name',
        nullable: false,
        length: 25,
    })
    bankName: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
    })
    deletedAt: Date;

    @Column({
        type: 'int4',
        default: 0,
    })
    versions: number;

    @OneToMany(() => MapBankAccountEntity, (mba) => mba.bank)
    mapBankAccount: MapBankAccountEntity[];

    @BeforeUpdate()
    updateVersionNumber() {
        this.versions += 1;
    }
}
