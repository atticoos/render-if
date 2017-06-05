'use strict';

const isFunction = input => typeof input === 'function';

function renderIf (predicate) {
  return elemOrThunk => predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;
}

renderIf.if = function multiStatement (initialCondition) {
  return renderIf.multi().if(initialCondition);
}

renderIf.multi = function () {
  const cases = [];

  function createCondition (priority) {
    return function conditionCase (condition) {
      return function conditionComponent (elemOrThunk) {
        cases.push({
          priority,
          condition,
          elemOrThunk
        });

        return api;
      }
    }
  }

  function evaluate() {
    let sortedCases = cases.sort((a, b) => a.priority > b.priority);

    for (let i = 0; i < sortedCases.length; i++) {
      if (sortedCases[i].condition) {
        if (isFunction(sortedCases[i].elemOrThunk)) {
          return sortedCases[i].elemOrThunk();
        }
        return sortedCases[i].elemOrThunk;
      }
    }

    return null;
  }

  const api = {
    if: createCondition(0),
    elseIf: createCondition(1),
    else: createCondition(2),
    evaluate
  };

  return api;
}

export default renderIf;
