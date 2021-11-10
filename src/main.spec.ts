import { Observable, Subject } from 'rxjs';
import { Statelify } from './main';
import { IntMapper } from './mappers/int-mapper';
import { AdapterState, IAdapter } from './statelify.model';

interface ExampleParams {
  page: number;
  pageSize: number;
  search?: string;
}

export class ExampleAdapter implements IAdapter {
  public stateChanged$: Observable<AdapterState>;
  private stateChangedSubject$ = new Subject<AdapterState>();

  constructor() {
    this.stateChanged$ = this.stateChangedSubject$.asObservable();
  }

  public simulateRouterChange(simulatedAdapterState: AdapterState): void {
    this.stateChangedSubject$.next(simulatedAdapterState);
  }

  someFunction(): string {
    throw new Error('Method not implemented.');
  }
}

describe('main', () => {
  let adapter: ExampleAdapter;
  let statelify: Statelify<ExampleParams>;

  beforeEach(() => {
    adapter = new ExampleAdapter();
    statelify = new Statelify<ExampleParams>({
      adapter,
      itemDefinitions: {
        page: {
          mapper: IntMapper
        },
        pageSize: {
          mapper: IntMapper
        },
        search: {
        }
      }
    });
  });

  it('should expose Observables for each parameter in the config', () => {
    expect(statelify.state.page).toBeDefined();
    expect(statelify.state.pageSize).toBeDefined();
    expect(statelify.state.search).toBeDefined();
  });

  it('should emit the new value when a watched value changes on the adapter', () => {
    let pageOutputs: number[] = [];
    statelify.state.page.subscribe(page => pageOutputs.push(page));

    adapter.simulateRouterChange({
      page: '2'
    });

    expect(pageOutputs).toEqual([2]);
  });
})



/*

CORE LIB
========

  - setup, tell it what params you have (params, defaults, mapper type)
  - method which you can call when url changes
  - observable/callbacks telling the outside world when url should be updated and with what values
  - teardown?


ANGULAR WRAPPER
========

  - injectable angular service
  - you give it statelify config (and activatedRoute) and it creates a statelify object
  - listen to the routerevents and pass them through into core
  - exposes statelify object to you (which contains the observables)

APP
========

  - inject StatelifyService (the angular wrapper) and use it to get a Statelify instance


  class MyPageComponent {
    public stateManager: Statelify;

    constructor() {}

    ngOnInit() {
      this.stateManager = new Statelify<Type>({
        adapter: new StatelifyAngularRouterAdapter({
          activatedRoute: this.activatedRoute
        }),
        itemDefinitions: {
          page: { type: number }
        }
      })

      this.stateManager.state.page.pipe(takeUntil(this.componentDestroyed$)).subscribe
    }
  }


  state
    { page: 1, pageSize: 5, search: 'foo' }
  stateItem
    page: 1
  config
    { adapter: <>, definitions: itemconfig[] }




  export class Statelify<T> {

    [P in keyof T]: Observable<T[P]>;


    constructor(opts: IStatelifyOpts<T>) { }



  }

  this.state.set({
    page: 1,
    pageSize: 10
  });

*/
