import { CATEGORIES_ENTITY } from 'src/dictionaries/constant.dictionary';
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
import { UsersEntity } from './users.entity';

@Entity(CATEGORIES_ENTITY)
@Index('catgeories_name_idx', ['name'], { unique: true })
@Index('categories_created_updated_idx', ['createdBy', 'updatedBy'])
export class CategoriesEntity extends BaseEntity {
    @Column({
        name: 'category_name',
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        nullable: true,
        type: 'text',
        name: 'description',
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

    @ManyToOne(() => UsersEntity)
    @JoinColumn({
        name: 'created_by',
        referencedColumnName: 'id',
    })
    createdBy: string;

    @ManyToOne(() => UsersEntity)
    @JoinColumn({
        name: 'updated_by',
        referencedColumnName: 'id',
    })
    updatedBy: string;

    @Column({
        type: 'int4',
        default: 0,
    })
    versions: number;

    @BeforeUpdate()
    updateVersionNumber() {
        this.versions += 1;
    }
}
