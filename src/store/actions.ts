import { action } from 'typesafe-actions';
import { SET_ACCOUNT_INFO } from '.';

export function setAccountInfo(account: string, token: number) {
    return action(SET_ACCOUNT_INFO, {
        account,
        token
    });
}
