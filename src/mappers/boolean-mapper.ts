import { IMapper } from '../statelify.model';

export const BooleanMapper: IMapper<boolean> = {
  fromString(stringValue: string): boolean {
    return stringValue?.toUpperCase() === 'TRUE';
  },
  toString(typedValue: boolean): string {
    return typedValue.toString();
  }
}
