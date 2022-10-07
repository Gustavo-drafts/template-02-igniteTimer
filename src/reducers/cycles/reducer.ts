import produce from "immer"
import { ActionTypes } from "./actions"

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}


interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}


export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {

    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {

      const currentCyclesIndex = state.cycles.findIndex((cycle) => { // findIndex retorna -1 quando não acha o valor específicado
        return cycle.id === state.activeCycleId
      })

      if (currentCyclesIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCyclesIndex].interruptedDate = new Date()
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FNISHED: {

      const currentCyclesIndex = state.cycles.findIndex((cycle) => { // findIndex retorna -1 quando não acha o valor específicado
        return cycle.id === state.activeCycleId
      })

      if (currentCyclesIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCyclesIndex].finishedDate = new Date()
      })
    }

    default:
      return state
  }
}