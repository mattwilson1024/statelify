import { IMapper } from '../statelify.model';

export const DefaultMapper: IMapper<any> = {
  fromString(val: string): any {
    return val;
  },
  toString(val: any): string {
    return val as string;
  }
}
