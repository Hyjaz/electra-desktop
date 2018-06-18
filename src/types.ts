import { WalletStartDataHard } from 'electra-js'

import { State as AccountState } from './account/types'
import { ToastState } from './common/toast/types'
import { State as UnlockModalState } from './common/unlock-modal/types'
import { State as HeaderState } from './header/types'
import { State as LoginState } from './login/types'
import { State as PaymentsState } from './payments/types'

export type Diff<T extends string, U extends string> = ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T]
export type Omit<T, K extends Extract<keyof T, string>> = Pick<T, Diff<Extract<keyof T, string>, K>>

export interface UserSettings extends WalletStartDataHard {
  appId: string
  settings: {
    apiToken: string
    autoMergeSavingsTransactionsAfterRewards: boolean
    autoTeamDonationFromRewards: boolean
    autoTeamDonationFromRewardsRatio: number
    autoUpdate: boolean
    electraUniverseTwitterUsername: string
    synchronizeSettings: boolean
  }
}

export interface ActionBase<ActionType extends string> {
  type: ActionType
}
export interface ActionBaseWithPayload<ActionType extends string, Payload> {
  type: ActionType
  payload: Payload
}

export type ActionBaseList<ActionType extends string> = {
  [Key in ActionType]: ActionBase<Key>
}

export type ActionBaseWithPayloadList<ActionType extends string> = {
  [Key in ActionType]?: ActionBaseWithPayload<Key, any>
}

export type ActionListGenerator<
  ActionType extends string,
  ActionsWithPayload extends ActionBaseWithPayloadList<ActionType>
  > = ActionBaseList<ActionType> & ActionsWithPayload

export interface StoreState {
  account: AccountState
  header: HeaderState
  login: LoginState
  payments: PaymentsState
  toast: ToastState
  unlockModal: UnlockModalState
}
