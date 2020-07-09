import { distinctUntilChanged, map } from 'rxjs/operators';
import { DefaultMapper } from './mappers/default-mapper';
import { IStatelifyConfig, ObservablesFor } from './statelify.model';

export class Statelify<T> {

  private _state: Partial<ObservablesFor<T>> = {};

  public get state(): ObservablesFor<T> {
    return this._state as ObservablesFor<T>;
  }

  constructor(private config: IStatelifyConfig<T>) {

    this.getItemDefinitionNames().forEach(itemName => {
      this._state[itemName] = config.adapter.stateChanged$.pipe(
        map(allProps => allProps[itemName as string]),
        distinctUntilChanged(),
        map(newStringValue => {
          const mapper = config.itemDefinitions[itemName].mapper || DefaultMapper
          return mapper.fromString(newStringValue);
        })
      );
    });

  }

  private getItemDefinitionNames(): Array<keyof T> {
    return Object.keys(this.config.itemDefinitions) as Array<keyof T>;
  }

}
