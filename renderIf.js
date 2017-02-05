'use strict';

const isFunction = input => typeof input === 'function';

const result = (value) => isFunction(value) ? value() : value;

export const or = (...elemsOrThunks) => {
  for (let index = 0; index < elemsOrThunks.length; index++) {
    let value = result(elemsOrThunks[index]);

    if (value != null) {
      return value;
    }
  }

  return null;
};

export default predicate => elemOrThunk => predicate ? result(elemOrThunk) : null;
