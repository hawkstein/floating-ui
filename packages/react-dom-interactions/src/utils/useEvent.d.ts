declare type AnyFunction = (...args: any[]) => any;
export declare function useEvent<T extends AnyFunction>(callback?: T): T;
export {};
