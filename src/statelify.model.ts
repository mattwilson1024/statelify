import { Observable } from 'rxjs';

export type ObservablesFor<T> = {
  [P in keyof T]: Observable<T[P]>;
}

export type ItemDefinitionsFor<T> = {
  [P in keyof T]: IStateItemDefinition<T[P]>;
}

export interface IStateItemDefinition<T> {
  mapper: any;
  defaultValue?: T;
}

export interface IStatelifyConfig<T> {
  adapter: any;
  itemDefinitions: ItemDefinitionsFor<Required<T>>;
}

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

