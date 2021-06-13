import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolesEntity } from "./roles.entity";

@Entity('permissions')
export class PermissionsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => RolesEntity, { nullable: true })
    @JoinTable({
        name: 'role_permission',
        joinColumn: {
            name: 'permissions',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'roles',
            referencedColumnName: 'id'
        }
    })
    roles?: RolesEntity[];

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    @Column({ nullable: true })
    createdBy: string;

    @Column({ nullable: true })
    updatedBy: string;

    @Column({ default: 0 })
    version: number;

    @BeforeInsert()
    updateInsertedData() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    updateUpdatedData() {
        this.updatedAt = new Date();
        this.version++;
    }
}