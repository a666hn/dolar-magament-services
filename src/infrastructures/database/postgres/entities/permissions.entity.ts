import { PERMISSION_ENTITY } from 'src/dictionaries/constant.dictionary';
import {
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { MapRolePermissionsEntity } from './map-role-permissions.entity';

@Entity(PERMISSION_ENTITY)
export class PermissionsEntity extends BaseEntity {
    @Column({
        unique: true,
    })
    name: string;

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

    @OneToMany(() => MapRolePermissionsEntity, (mrp) => mrp.permission)
    public mapRolePermissions: MapRolePermissionsEntity[];

    @BeforeUpdate()
    updateVersionOnUpdate() {
        this.versions += 1;
    }
}
