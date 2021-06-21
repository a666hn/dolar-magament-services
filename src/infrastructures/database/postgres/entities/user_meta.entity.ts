import { USER_META_ENTITY } from 'src/dictionaries/constant.dictionary';
import { ACCOUNT_STATUS } from 'src/globals/global.enum';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity(USER_META_ENTITY)
export class UserMetaEntity extends BaseEntity {
    @Column({
        type: 'timestamp',
        name: 'last_login',
    })
    lastLogin: Date;

    @Column({
        name: 'is_email_verified',
        default: false,
    })
    isEmailVerified: boolean;

    @Column({
        nullable: false,
        enum: ACCOUNT_STATUS,
        default: ACCOUNT_STATUS.REGISTERED,
        enumName: 'account_status_enum',
        name: 'account_status',
    })
    status: string;

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
}
