import { IMapper } from '../statelify.model';

export const StringMapper: IMapper<string> = {
  fromString(stringValue: string): string {
    return stringValue;
  },
  toString(typedValue: string): string {
    return typedValue;
  }
}
