import types from './actionTypes';

export const loadWeb3Success = payload => ({ type: types.LOAD_WEB3_SUCCESS, payload });

export const loadWeb3Fail = payload => ({ type: types.LOAD_WEB3_FAIL, payload });

export const loadContractSuccess = payload => ({ type: types.LOAD_CONTRACT_SUCCESS, payload });

export const callTotalListsSuccess = payload => ({ type: types.CALL_TOTAL_LISTS_SUCCESS, payload });

export const callListIdsSuccess = payload => ({ type: types.CALL_LIST_IDS_SUCCESS, payload });

export const sendCreateListSuccess = payload => ({ type: types.SEND_CREATE_LIST_SUCCESS, payload });

export const txAdd = payload => ({ type: types.TX_ADD, payload });

export const txRemove = payload => ({ type: types.TX_REMOVE, payload });

export const callListSuccess = payload => ({ type: types.CALL_LIST_SUCCESS, payload });

export const callAllListSuccess = payload => ({ type: types.CALL_ALL_LIST_SUCCESS, payload });

