import { BaseEntity } from '@/types';

export interface Review extends BaseEntity {
  username: string;
  title: string;
  description: string;
  rating: number; // 1 - 5
}
