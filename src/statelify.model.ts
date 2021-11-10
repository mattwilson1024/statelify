import { Observable } from 'rxjs';

export type ObservablesFor<T> = {
  [P in keyof T]: Observable<T[P]>;
}

export type ItemDefinitionsFor<T> = {
  [P in keyof T]: IStateItemDefinition<T[P]>;
}

export interface IStateItemDefinition<T> {
  mapper?: IMapper<T>;
  defaultValue?: T;
}

export interface IStatelifyConfig<T> {
  adapter: IAdapter;
  itemDefinitions: ItemDefinitionsFor<Required<T>>;
}

export interface IMapper<T> {
  fromString(stringValue: string): T;
  toString(typedValue: T): string;
}

export interface IAdapter {
  stateChanged$: Observable<AdapterState>;
}

export type AdapterState = { [ item: string ]: string }



/**
 *
 * {
 *  something: 'test',
 *  aNumber: 1
 * }
 *
 * {
 *  something: {  }
 *  aNumber: {  }
 * }
 *
 * const aThing = { 1: 1, a: 2 };
 * aThing[1] = 1
 * aThing["1"] = 1
 * aThing[a] = syntax error
 * aThing["a"] = 2
 *
 */

