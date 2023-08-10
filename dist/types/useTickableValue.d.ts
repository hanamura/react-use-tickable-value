type Watcher = (newValue: number, oldValue: number) => void;
/**
 * A hook for managing frequently updated values
 */
export declare const useTickableValue: (initial: number) => {
    get: () => number;
    set: (to: number | ((v: number) => number)) => void;
    watch: (callback: Watcher) => (() => void);
};
export {};
