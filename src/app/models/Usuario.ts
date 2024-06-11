import { Type } from "@angular/core";

export interface Usuario{
    id: number,
    email: string,
    password: string,
    login: string,
    type: string,
    name: string,
    role: string
}