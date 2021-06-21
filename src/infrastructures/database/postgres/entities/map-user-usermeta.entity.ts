import { MAP_USER_USERMETA_ENTITY } from 'src/dictionaries/constant.dictionary';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UsersEntity } from './users.entities';
import { UserMetaEntity } from './user_meta.entity';

@Entity(MAP_USER_USERMETA_ENTITY)
export class MapUserUserMetaEntity extends BaseEntity {
    @Column({
        name: 'user_id',
    })
    userId: string;

    @Column({
        name: 'user_meta_id',
    })
    userMetaId: string;

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

    @OneToOne(() => UsersEntity)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user: UsersEntity;

    @OneToOne(() => UserMetaEntity)
    @JoinColumn({
        name: 'user_meta_id',
        referencedColumnName: 'id',
    })
    userMeta: UserMetaEntity;
}
