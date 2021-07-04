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
import { RolesEntity } from './roles.entity';
import { UsersEntity } from './users.entity';

@Entity({ name: 'map_user_role' })
@Index('map_user_role_userid_roleid_idx', ['userId', 'roleId'], {
    unique: true,
})
export class MapUserRoleEntity extends BaseEntity {
    @Column({
        name: 'user_id',
    })
    userId: string;

    @Column({
        name: 'role_id',
    })
    roleId: number;

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

    @ManyToOne(() => UsersEntity)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user: UsersEntity;

    @ManyToOne(() => RolesEntity)
    @JoinColumn({
        name: 'role_id',
        referencedColumnName: 'id',
    })
    role: RolesEntity;

    @BeforeUpdate()
    updateCountVersion() {
        this.versions += 1;
    }
}
