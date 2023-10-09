import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface User {
    id: number;
    username: string;
    email: string;
}


export interface LoginRequest {
    username: string
    password: string
}