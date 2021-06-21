import { toUpper } from 'lodash';
import { ROLE_ENTITY } from 'src/dictionaries/constant.dictionary';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity(ROLE_ENTITY)
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

    @BeforeInsert()
    updateNameAfterInsert() {
        this.name = toUpper(this.name);
    }

    @BeforeUpdate()
    updateNameAfterUpdateData() {
        this.name = toUpper(this.name);
        this.versions += 1;
    }
}
