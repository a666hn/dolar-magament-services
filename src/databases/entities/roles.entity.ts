import { Exclude } from 'class-transformer';
import { snakeCase, toUpper } from 'lodash';
import { ROLES_ENTITY } from 'src/globals/dictionary/entity.dictionary';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { PermissionsEntity } from './permissions.entity';
import { UsersEntity } from './users.entity';

@Entity(ROLES_ENTITY)
export class RolesEntity {
    @PrimaryColumn()
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => UsersEntity)
    @JoinTable({
        name: 'map_role_user',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    })
    @Exclude()
    users: UsersEntity[];

    @OneToMany(() => PermissionsEntity, (permission) => permission.roles, {
        nullable: true,
    })
    permissions: PermissionsEntity[];

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
        this.id = toUpper(snakeCase(this.name));
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    updateUpdatedData() {
        this.updatedAt = new Date();
        this.version++;
    }
}
