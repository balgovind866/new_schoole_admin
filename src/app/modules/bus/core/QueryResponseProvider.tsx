import { FC, useContext, useEffect, useMemo, useState } from "react"
import { useQueryRequest } from "./QueryRequestProvider"
import { useQuery } from "@tanstack/react-query"
import { createResponseContext, initialQueryResponse, initialQueryState, PaginationState, QUERIES, stringifyRequestQuery, WithChildren } from "../../../../_metronic/helpers"
import { getCourtsList } from "./_requests"
import { CourtModel } from "./_model"

const QueryResponseContext = createResponseContext<CourtModel>(initialQueryResponse)
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
    queryKey: [`${QUERIES.COURTS_URL}-${query}`],
    queryFn: () => getCourtsList(query),
    refetchOnWindowFocus: false,
  });

  return (
    <QueryResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const { response } = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  }

  const { response } = useQueryResponse()
  if (!response || !response.payload || !response.payload.pagination) {
    return defaultPaginationState
  }

  return response.payload.pagination
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