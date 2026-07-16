const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const getApiBaseUrl = (component = '') => {
  const cleanComponent = component.startsWith('/') ? component.slice(1) : component
  const endpoint = cleanComponent ? `/api/${cleanComponent}/` : '/api/'

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev${endpoint}`
  }

  return endpoint
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
