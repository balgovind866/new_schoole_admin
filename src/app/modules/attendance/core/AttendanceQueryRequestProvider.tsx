/* eslint-disable react-refresh/only-export-components */
import { FC, useState, createContext, useContext } from 'react'
import {
    QueryState,
    QueryRequestContextProps,
    initialQueryRequest,
    WithChildren,
} from '../../../../_metronic/helpers'

// Create Attendance-specific context
const AttendanceQueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const AttendanceQueryRequestProvider: FC<WithChildren> = ({ children }) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updatedState = { ...state, ...updates } as QueryState
        setState(updatedState)
    }

    return (
        <AttendanceQueryRequestContext.Provider value={{ state, updateState }}>
            {children}
        </AttendanceQueryRequestContext.Provider>
    )
}

// Hook to use the context
const useAttendanceQueryRequest = () => useContext(AttendanceQueryRequestContext)

export { AttendanceQueryRequestProvider, useAttendanceQueryRequest }
