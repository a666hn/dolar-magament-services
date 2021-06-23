import { MAP_ROLE_PERMISSIONS_ENTITY } from 'src/dictionaries/constant.dictionary';
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
import { PermissionsEntity } from './permissions.entity';
import { RolesEntity } from './roles.entity';

@Index('map_role_permissions_idx', ['roleId', 'permissionId'], { unique: true })
@Entity(MAP_ROLE_PERMISSIONS_ENTITY)
export class MapRolePermissionsEntity extends BaseEntity {
    @Column({
        name: 'role_id',
    })
    roleId: string;

    @Column({
        name: 'permission_id',
    })
    permissionId: string;

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

    @ManyToOne(() => RolesEntity)
    @JoinColumn({
        name: 'role_id',
        referencedColumnName: 'id',
    })
    role: RolesEntity;

    @ManyToOne(() => PermissionsEntity)
    @JoinColumn({
        name: 'permission_id',
        referencedColumnName: 'id',
    })
    permission: PermissionsEntity;

    @BeforeUpdate()
    updateVersionOnUpdate() {
        this.versions += 1;
    }
}
