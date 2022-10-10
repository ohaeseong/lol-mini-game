import { Maybe } from "../types/UtilTypes";

export function safelyGet<T>(callback: () => T): Maybe<T> {
  try {
    return callback();
  } catch (error) {
    return null;
  }
}
