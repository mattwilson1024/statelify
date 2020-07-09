import { IMapper } from '../statelify.model';

export const StringMapper: IMapper<string> = {
  fromString(val: string): string {
    return val;
  },
  toString(val: string): string {
    return val;
  }
}
