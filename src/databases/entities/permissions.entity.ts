import { snakeCase, toUpper } from 'lodash';
import {
    MAPPING_PERMISSIONS_TO_ROLE,
    PERMISSIONS_ENTITY,
} from 'src/globals/dictionary/entity.dictionary';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryColumn,
} from 'typeorm';
import { RolesEntity } from './roles.entity';

@Entity(PERMISSIONS_ENTITY)
export class PermissionsEntity {
    @PrimaryColumn({ unique: true })
    id: string;

    @Column({
        nullable: false,
    })
    name: string;

    @Column()
    description: string;

    @Column({
        nullable: false,
    })
    scoped: string;

    @ManyToMany(() => RolesEntity, { nullable: true })
    @JoinTable({
        name: MAPPING_PERMISSIONS_TO_ROLE,
        joinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    })
    roles: RolesEntity[];

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
