import { IMapper } from '../statelify.model';

export const DefaultMapper: IMapper<any> = {
  fromString(stringValue: string): any {
    return stringValue;
  },
  toString(typedValue: any): string {
    return typedValue as string;
  }
}
