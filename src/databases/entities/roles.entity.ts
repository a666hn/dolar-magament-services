import { Exclude } from "class-transformer";
import { snakeCase, toUpper } from "lodash";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity('roles')
export class RolesEntity {
    @PrimaryColumn()
    id: string;

    @Column({ unique: true })
    roleName: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => UsersEntity)
    @JoinTable({
        name: 'roles_user',
        joinColumn: {
            name: 'roles',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'users',
            referencedColumnName: 'id'
        }
    })
    @Exclude()
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
        this.id = toUpper(snakeCase(this.roleName));
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    updateUpdatedData() {
        this.updatedAt = new Date();
        this.version++;
    }
}