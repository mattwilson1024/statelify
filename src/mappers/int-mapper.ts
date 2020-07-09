import { IMapper } from '../statelify.model';

export const IntMapper: IMapper<number> = {
  fromString(val: string): number {
    return parseInt(val, 10);
  },
  toString(val: number): string {
    return val.toString();
  }
}
