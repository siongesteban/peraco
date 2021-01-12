export type Reducer<TState, TAction> = (
  state: TState,
  action: TAction,
) => TState;
