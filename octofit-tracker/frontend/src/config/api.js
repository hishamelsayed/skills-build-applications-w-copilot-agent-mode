const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const getApiBaseUrl = (path = '') => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api${cleanPath}`
  }

  return `/api${cleanPath}`
}

export const getCollection = (payload, collectionKey) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload[collectionKey])) {
      return payload[collectionKey]
    }

    if (Array.isArray(payload.results)) {
      return payload.results
    }

    if (Array.isArray(payload.data)) {
      return payload.data
    }
  }

  return []
}
