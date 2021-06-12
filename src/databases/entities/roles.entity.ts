import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity('roles')
export class RolesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    roleName: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => UsersEntity)
    @JoinTable({
        name: 'role_user',
        joinColumn: {
            name: 'roles',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'users',
            referencedColumnName: 'id'
        }
    })
    users: UsersEntity[];

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