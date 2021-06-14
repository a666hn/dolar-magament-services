import { USERS_PROFILE_ENTITY } from 'src/globals/dictionary/entity.dictionary';
import { ACCOUNT_PROFILE_STATUS } from 'src/globals/global.enum';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity(USERS_PROFILE_ENTITY)
export class UsersProfileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => UsersEntity, {
        nullable: false,
        createForeignKeyConstraints: true,
    })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user: UsersEntity;

    @Column('simple-json', {
        nullable: true,
    })
    avatar?: { url?: string; key?: string };

    @Column('simple-json', {
        nullable: true,
    })
    background?: { url?: string; key?: string };

    @Column({ nullable: true })
    bio: string;

    @Column('simple-array', {
        name: 'social_media',
        nullable: true,
    })
    socialMedia: string[];

    @Column({
        name: 'account_status',
        enum: ACCOUNT_PROFILE_STATUS,
        enumName: 'account_profile_status_enum',
        default: ACCOUNT_PROFILE_STATUS.GUEST,
    })
    accountStatus: ACCOUNT_PROFILE_STATUS;

    @Column({
        nullable: true,
    })
    address: string;

    @Column({
        name: 'created_at',
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        nullable: true,
    })
    updatedAt: Date;

    @Column({
        name: 'created_by',
        nullable: true,
    })
    createdBy: string;

    @Column({
        name: 'updated_by',
        nullable: true,
    })
    updatedBy: string;

    @Column({
        default: 0,
    })
    version: number;

    @BeforeInsert()
    updateInsertedData() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    updateUpdatedData() {
        this.updatedAt = new Date();
        this.version++;
    }
}
