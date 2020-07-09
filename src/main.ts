import { of } from 'rxjs';
import { IStatelifyConfig, ObservablesFor } from './statelify.model';

export class Statelify<T> {

  private _state: Partial<ObservablesFor<T>> = {};

  public get state(): ObservablesFor<T> {
    return this._state as ObservablesFor<T>;
  }


  constructor(private config: IStatelifyConfig<T>) {


    this.getItemDefinitionNames().forEach(x => {
      this._state[x] = of();
    })


  }

  private getItemDefinitionNames(): Array<keyof T> {
    return Object.keys(this.config.itemDefinitions) as Array<keyof T>;
  }

}

