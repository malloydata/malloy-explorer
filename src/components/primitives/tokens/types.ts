import {tokenColorVariants, tokenSizeVariants} from './styles';

export const DEFAULT_TOKEN_COLOR = 'default';
export const DEFAULT_TOKEN_SIZE = 'default';

export type TokenColor = keyof typeof tokenColorVariants;
export type TokenSize = keyof typeof tokenSizeVariants;
