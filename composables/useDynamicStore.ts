const stores: Record<string, any> = {
}

export const useDynamicStore = (resource: string) => {
  if (resource in stores) {
    return stores[resource]()
  }
  
  return null
}
