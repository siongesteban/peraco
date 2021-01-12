export type BaseAction<TType, TPayload = undefined> = {
  type: TType;
} & (TPayload extends undefined
  ? { payload?: TPayload }
  : { payload: TPayload });
