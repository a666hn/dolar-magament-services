import { toUpper } from 'lodash';
import { ROLE_ENTITY } from 'src/dictionaries/constant.dictionary';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { MapRolePermissionsEntity } from './map-role-permissions.entity';
import { MapUserRoleEntity } from './map-user-role.entity';

@Entity({ name: ROLE_ENTITY })
@Index('role_idx', ['name'], { unique: true })
export class RolesEntity {
    @PrimaryColumn()
    id: number;

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
    createdAt?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt?: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
    })
    deletedAt?: Date;

    @Column({
        type: 'int4',
        default: 0,
    })
    versions?: number;

    @OneToMany(() => MapRolePermissionsEntity, (mrp) => mrp.role)
    public mapRolePermissions?: MapRolePermissionsEntity[];

    @OneToMany(() => MapUserRoleEntity, (mur) => mur.user)
    public mapUserRoles?: MapUserRoleEntity[];

    @BeforeInsert()
    updateNameAfterInsert?() {
        this.name = toUpper(this.name);
    }

    @BeforeUpdate()
    updateNameAfterUpdateData?() {
        this.name = toUpper(this.name);
        this.versions += 1;
    }
}
