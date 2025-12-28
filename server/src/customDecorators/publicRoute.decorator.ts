import { SetMetadata } from "@nestjs/common";

// constants.ts or auth.constants.ts
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);