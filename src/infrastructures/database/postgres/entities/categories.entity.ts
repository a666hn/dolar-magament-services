import { CATEGORIES_ENTITY } from 'src/dictionaries/constant.dictionary';
import {
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity(CATEGORIES_ENTITY)
@Index('catgeories_name_idx', ['name'], { unique: true })
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
