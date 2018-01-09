import { get, post } from '../../httpRequest/httpMethods';

export function vocabularCreate(vocabular) {
  return () =>
    post(
      '/vocabular',
      vocabular,
    );
}

export function getAllVocabulars() {
  return dispatch =>
    get('/vocabular')
      .then((res) => {
        dispatch({
          type: 'VOCABULAR_LIST',
          payload: res.data,
        });
      });
}

export function getVocabularById(vocabularId) {
  return dispatch =>
    get(`/vocabular/${vocabularId}`)
      .then((res) => {
        dispatch({
          type: 'VOCABULAR_INFO',
          payload: res.data,
        });
      });
}

export function vocabularAddTermToChild(path, term) {

}

export function vocabularAddTermToRoot(term) {

}