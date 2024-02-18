export type Signal<TRequest, TResponse> = (
    request: TRequest,
    reply: (response: TResponse) => void
) => void;

export type EmptySignal = (
    // empty
) => void;

export type NoReplySignal<TData> = (
    data: TData
) => void;