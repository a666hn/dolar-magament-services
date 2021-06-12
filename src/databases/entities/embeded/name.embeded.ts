import { Column } from "typeorm";

export class Name {
    @Column({ nullable: false })
    first: string;

    @Column({ nullable: true })
    last: string;
}