import { IMapper } from '../statelify.model';

export const IntMapper: IMapper<number> = {
  fromString(stringValue: string): number {
    return parseInt(stringValue, 10);
  },
  toString(typedValue: number): string {
    return typedValue.toString();
  }
}
