import { WalletAddress, WalletAddressCategory } from 'electra-js'

import { SetMessageAndBadge } from '../common/toast/types'
import { ActionBaseWithPayload, ActionListGenerator } from '../types'

/*
 * State
 */
export interface State {
  addressError: string | undefined
  amountError: string | undefined
  isUnlockModalOpened: boolean
}
export interface OwnState {
  addresses: WalletAddress[]
}
export interface Transaction {
  amount: number
  fromCategory: WalletAddressCategory
  toAddress: string
}

/*
 * Dispatchers
 */
export type Dispatchers = {
  submitTransaction(
    amount: number,
    fromCategory: WalletAddressCategory,
    toAddress: string,
  ): ActionList['SUBMIT_TRANSACTION']
  toggleUnlockModal(): ActionList['TOGGLE_UNLOCK_MODAL']
}
export type ComponentDispatchers = Dispatchers & {
  setMessageAndBadge(message: string, badge: string): SetMessageAndBadge
}

/*
 * Actions
 */
export enum ActionType {
  SEND_TRANSACTION = 'SEND_TRANSACTION',
  SEND_TRANSACTION_ERROR = 'SEND_TRANSACTION_ERROR',
  SEND_TRANSACTION_SUCCESS = 'SEND_TRANSACTION_SUCCESS',
  SUBMIT_TRANSACTION = 'SUBMIT_TRANSACTION',
  SUBMIT_TRANSACTION_ERROR = 'SUBMIT_TRANSACTION_ERROR',
  TOGGLE_UNLOCK_MODAL = 'TOGGLE_UNLOCK_MODAL',
}

export type ActionList = ActionListGenerator<ActionType, {
  SEND_TRANSACTION: ActionBaseWithPayload<ActionType.SEND_TRANSACTION, Transaction>
  SUBMIT_TRANSACTION: ActionBaseWithPayload<ActionType.SUBMIT_TRANSACTION, Transaction>
  SUBMIT_TRANSACTION_ERROR: ActionBaseWithPayload<
    ActionType.SUBMIT_TRANSACTION_ERROR,
    { addressError?: string, amountError?: string }
  >
}>
