export type Signal<TRequest, TResponse> = (
    request: TRequest,
    reply: (response: TResponse) => void
) => void