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

@Entity({ name: 'map_role_permission' })
@Index('map_role_permissions_idx', ['roleId', 'permissionId'], { unique: true })
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

    @ManyToOne(() => RolesEntity, (r) => r.mapRolePermissions)
    @JoinColumn({
        name: 'role_id',
    })
    public role: RolesEntity;

    @ManyToOne(() => PermissionsEntity)
    @JoinColumn({
        name: 'permission_id',
    })
    public permission: PermissionsEntity;

    @BeforeUpdate()
    updateVersionOnUpdate() {
        this.versions += 1;
    }
}
