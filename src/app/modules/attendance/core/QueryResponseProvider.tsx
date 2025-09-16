import {
    createResponseContext,
    initialQueryResponse,
    initialQueryState,
    PaginationState,
    QUERIES,
    stringifyRequestQuery,
    WithChildren
} from "../../../../_metronic/helpers"
import { useQueryRequest } from "./QueryRequestProvider"
import { FC, useContext, useEffect, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAttendanceList } from "./_request"

const QueryResponseContext = createResponseContext(initialQueryResponse)

const QueryResponseProvider: FC<WithChildren> = ({ children }) => {
    const { state } = useQueryRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const { isFetching, refetch, data: response } = useQuery({
        queryKey: [`${QUERIES.ATTENDANCE_LIST}-${query}`],
        queryFn: () => getAttendanceList(query),
        refetchOnWindowFocus: false,
    })

    return (
        <QueryResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
            {children}
        </QueryResponseContext.Provider>
    )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
    const { response } = useQueryResponse()
    return response?.data || []
}

const useQueryResponsePagination = (): PaginationState => {
    const { response } = useQueryResponse()
    return response?.payload?.pagination ?? {
        links: [],
        ...initialQueryState,
    }
}

const useQueryResponseLoading = (): boolean => {
    const { isLoading } = useQueryResponse()
    return isLoading
}

export {
    QueryResponseProvider,
    useQueryResponse,
    useQueryResponseData,
    useQueryResponsePagination,
    useQueryResponseLoading,
}
