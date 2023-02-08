import {createReducer, on} from "@ngrx/store";
import {BtnActions} from "./actions";

export interface Btn {
  name: string
  class: string
  id: number
}

const initialState: Btn[] = [
  {
    name: 'Platform Launch',
    class: 'SideNav__tab SideNav__tab--active',
    id: 1,
  }, {
    name: 'Marketing Plan',
    class: 'SideNav__tab',
    id: 2,
  },
  {
    name: ' Roadmap',
    class: 'SideNav__tab',
    id: 3,
  },

]

export const buttonReducer = createReducer(
  initialState,
  on(BtnActions.getAll,
    state => state
  ),
  on(BtnActions.addBtn,
    (state, {item}) => [...state, item]
  ),
)
