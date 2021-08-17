import { error } from '@pnotify/core';

function createError(text) {
  error({
    text,
    sticker: false,
    hide: true,
    delay: 1500,
  });
}

function onFetchError() {
  createError('fetchError');
}
function onCatchError() {
  createError('catchError');
}

function onTooManyMatches() {
  createError('Too many matches found. Please enter a more specific query!');
}
const ERRORS = {
  FETCH: 'ErrorFetch',
  CATCH: 'ErrorCatch',
};
const FETCH_ERRORS = {
  [ERRORS.FETCH]: onFetchError,
  [ERRORS.CATCH]: onCatchError,
};
export { onTooManyMatches, FETCH_ERRORS, ERRORS };
