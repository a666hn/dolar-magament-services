export interface RoleResponse {
    roles?: RoleData[];
    role?: RoleData;
}

interface RoleData {
    label: string;
    value: number;
}
