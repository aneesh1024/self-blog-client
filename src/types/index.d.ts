import type { JwtPayload } from "jwt-decode";

declare global {
    export interface Blog {
        _id: string;
        title: string;
        content: string;
        createdAt: string; // Or Date object if you prefer
    }

    export interface JWTPayloadWithRole extends JwtPayload {
        role: string;
    }
}


export { }