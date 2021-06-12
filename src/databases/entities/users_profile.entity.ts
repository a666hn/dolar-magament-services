import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity('users_profile')
export class UsersProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ nullable: true })
    photoUrl: string;

    @Column({ nullable: true })
    backgroundUrl: string;

    @Column({ nullable: true })
    bio: string;

    @Column("simple-array", { nullable: true })
    socialMedia: string[];

    @Column({ nullable: true })
    address: string;
}