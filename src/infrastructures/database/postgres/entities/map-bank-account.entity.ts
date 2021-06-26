import { MAP_BANK_ACCOUNT_ENTITY } from 'src/dictionaries/constant.dictionary';
import {
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { BankEntity } from './bank.entity';
import { UsersEntity } from './users.entity';

@Entity(MAP_BANK_ACCOUNT_ENTITY)
@Index('map_bank_account_user_bank_idx', ['bankId', 'userId', 'bankNumber'], {
    unique: true,
})
@Index('map_bank_account_default_account_name_idx', [
    'accountName',
    'isDefault',
])
export class MapBankAccountEntity extends BaseEntity {
    @Column({
        name: 'user_id',
        nullable: false,
    })
    userId: string;

    @Column({
        type: 'int4',
        name: 'bank_id',
        nullable: false,
    })
    bankId: number;

    @Column({
        name: 'bank_number',
        nullable: false,
    })
    bankNumber: string;

    @Column({
        name: 'account_name',
        nullable: false,
    })
    accountName: string;

    @Column({
        name: 'is_default',
        nullable: false,
    })
    isDefault: boolean;

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

    @ManyToOne(() => BankEntity)
    @JoinColumn({
        name: 'bank_id',
        referencedColumnName: 'id',
    })
    bank: BankEntity;

    @ManyToOne(() => UsersEntity)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user: UsersEntity;

    @BeforeUpdate()
    updateVersionNumber() {
        this.versions += 1;
    }
}
