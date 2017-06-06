'use strict';

const isFunction = input => typeof input === 'function';

function renderElemOrThunk (elemOrThunk) {
  if (isFunction(elemOrThunk)) {
    return elemOrThunk()
  }
  return elemOrThunk;
}

function renderIf (predicate) {
  return elemOrThunk => predicate ? renderElemOrThunk(elemOrThunk) : null;
}

renderIf.if = function multiStatement (initialCondition) {
  return renderIf.multi().if(initialCondition);
}

renderIf.switch = function switchStatement (subject) {
  const cases = [];

  function switchCase (value) {
    return function switchComponent (elemOrThunk) {
      cases.push({
        default: false,
        elemOrThunk,
        value
      });

      return api;
    }
  }

  function switchDefault (elemOrThunk) {
    cases.push({
      default: true,
      elemOrThunk
    });

    return api;
  }

  function evaluate() {
    const sortedCase = cases.sort((a, b) => a.default && !b.default);

    for (let i = 0; i < sortedCase.length; i++) {
      const currentCase = sortedCase[i];

      if (!currentCase.default) {
        if (currentCase.value === subject) {
          return renderElemOrThunk(currentCase.elemOrThunk);
        }
      } else if (currentCase.default) {
        return renderElemOrThunk(currentCase.elemOrThunk);
      }
    }

    return null;
  }

  const api = {
    case: switchCase,
    default: switchDefault,
    evaluate
  };

  return api;
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

  function elseCondition (elemOrThunk) {
    cases.push({
      priority: 2,
      condition: true,
      elemOrThunk
    });

    return api;
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
    else: elseCondition,
    evaluate
  };

  return api;
}

export default renderIf;
