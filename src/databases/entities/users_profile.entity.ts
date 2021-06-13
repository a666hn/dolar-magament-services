import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users_profile')
export class UsersProfileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column("simple-json", { nullable: true })
    avatar?: { url?: string, key?: string };

    @Column("simple-json", { nullable: true })
    background?: { url?: string, key?: string };

    @Column({ nullable: true })
    bio: string;

    @Column("simple-array", { nullable: true })
    socialMedia: string[];

    @Column({ nullable: true })
    address: string;

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