import { IMapper } from '../statelify.model';

export const FloatMapper: IMapper<number> = {
  fromString(stringValue: string): number {
    return parseFloat(stringValue);
  },
  toString(typedValue: number): string {
    return typedValue.toString();
  }
}
