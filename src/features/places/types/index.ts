import { BaseEntity } from '@/types';

export interface Place extends BaseEntity {
  name: string;
  description: string;
  category?: string[];
}
