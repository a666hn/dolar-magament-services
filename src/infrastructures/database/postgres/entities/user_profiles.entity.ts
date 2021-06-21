import { USER_PROFILE_ENTITY } from 'src/dictionaries/constant.dictionary';
import {
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity(USER_PROFILE_ENTITY)
export class UserProfiles extends BaseEntity {
    @Column({
        type: 'text',
        nullable: true,
    })
    bio: string;

    @Column('simple-array', {
        nullable: true,
        name: 'social_media',
    })
    socialMedia: string[];

    @Column('simple-json', {
        nullable: true,
    })
    avatar?: { key?: string; url?: string };

    @Column('simple-json', {
        nullable: true,
        name: 'background_profile',
    })
    backgroundProfile?: { key?: string; url?: string };

    @Column({
        name: 'phone_number',
        nullable: true,
    })
    phoneNumber: string;

    @Column({
        nullable: true,
    })
    address: string;

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

    @BeforeUpdate()
    updatedVersionRow() {
        this.versions += 1;
    }
}
