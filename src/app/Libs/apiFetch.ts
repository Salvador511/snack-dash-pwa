import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToken } from '~/app/store/useToken'

export const STALE_TIME_5M = 1000 * 60 * 5
export const STALE_TIME_1M = 1000 * 60

const FOUR_HUNDREDS = [400, 401, 403, 409, 500]

type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export const apiFetch = async ({
  payload,
  method,
  url,
  token,
}: {
  payload?: any,
  method: Methods,
  url: string,
  token: string | null,
}) => {
  const options: any = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
  }
  if (method !== 'GET') {
    options.body = JSON.stringify(payload)
  }
  const response = await fetch(url, options)
  if (FOUR_HUNDREDS.includes(response.status)) {
    const data = await response.json()
    throw data
  }
  const data = await response.json()
  return data
}


export const useApiQuery = (
  { url, payload = {}, key, ...options }:
  { url: string, payload?: any, key: string }
) => {
  const token = useToken(state => state.token)
  return useQuery({
    staleTime: STALE_TIME_5M,
    queryKey: [key],
    queryFn: () => apiFetch({ url, payload, method: 'GET', token, ...options }),
  })
}


export const useApiMutation = (
  { url, method, key, ...options }:
  { url: string, method: Methods, key: string }
) => {
  const ALLOWED_METHODS = ['POST', 'PUT', 'PATCH']
  if (!ALLOWED_METHODS.includes(method)) throw new TypeError(`Error: useApiMutation does not support method: ${method}`)

  const token = useToken(state => state.token)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: payload => apiFetch({ url, payload, method, token,...options }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}


export const useApiDelete = (
  { url, key }
  : { url: string, key: string }
) => {
  const token = useToken(state => state.token)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: payload => apiFetch({ url, payload, method: 'DELETE', token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
    }
  })
}