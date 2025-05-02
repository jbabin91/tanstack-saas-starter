import type { User } from '@/db';

export type UserApiOutput = Omit<User, 'metadata' | 'emailVerified' | 'image'>;
