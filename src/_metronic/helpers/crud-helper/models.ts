import { Dispatch, SetStateAction } from 'react'
import { AlertModel } from '../../../app/modules/shared/models/_models'

export type ID = undefined | null | number

export type PaginationState = {
  page: number
  items_per_page: 10 | 30 | 50 | 100
  links?: Array<{ label: string; active: boolean; url: string | null; page: number | null }>
}

export type SortState = {
  sort?: string
  order?: 'asc' | 'desc'
}

export type FilterState = {
  filter?: unknown
}

export type SearchState = {
  search?: string
}

export type Response<T> = {
  [x: string]: any
  data?: T
  payload?: {
    message?: string
    errors?: {
      [key: string]: Array<string>
    }
    pagination?: PaginationState
  }
}

export type QueryState = PaginationState & SortState & FilterState & SearchState

export type QueryRequestContextProps = {
  state: QueryState
  updateState: (updates: Partial<QueryState>) => void
}

export const initialQueryState: QueryState = {
  page: 1,
  items_per_page: 10,
}

export const initialQueryRequest: QueryRequestContextProps = {
  state: initialQueryState,
  updateState: () => { },
}

export type QueryResponseContextProps<T> = {
  response?: Response<Array<T>> | undefined
  refetch: () => void
  isLoading: boolean
  query: string
}

export const initialQueryResponse = { refetch: () => { }, isLoading: false, query: '' }


export type ListViewContextProps = {
  selected: Array<ID>
  onSelect: (selectedId: ID) => void
  onSelectAll: () => void
  clearSelected: () => void
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  itemIdForUpdate?: ID
  setItemIdForUpdate: Dispatch<SetStateAction<ID>>
  isAllSelected: boolean
  disabled: boolean
  alertForDrawer?: AlertModel
  setAlertForDrawer: Dispatch<SetStateAction<AlertModel>>
}

export type ToolbarType =
  | 'accounting'
  | 'attendance'
  | 'classic'
  | 'extended'
  | 'organization'
  | 'reports'
  | 'saas'
  | 'vendors'
  | 'work'
  | 'courts'
  |'herosliders'
  |'student'
  |'teacher'
  |'allstaff'
  |'allbus'
    


export const initialListView: ListViewContextProps = {
  selected: [],
  onSelect: () => { },
  onSelectAll: () => { },
  clearSelected: () => { },
  setItemIdForUpdate: () => { },
  isAllSelected: false,
  disabled: false,
  setAlertForDrawer: () => { }
}
