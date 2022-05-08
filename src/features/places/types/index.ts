import { BaseEntity } from '@/types';

export interface Place extends BaseEntity {
  uuid?: string;
  coverImageURI?: string;
  name: string;
  description: string;
}
