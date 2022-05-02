import { BaseEntity } from '@/types';

export interface Place extends BaseEntity {
  uuid: string;
  name: string;
  description: string;
  category?: string[];
}
