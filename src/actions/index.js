const menuLoaded = (newMenu) => {
  return {
    type: 'MENU_LOADED',
    payload: newMenu,
  }
}

const menuRequested = () => {
  return {
    type: 'MENU_REQUESTED',
  }
}

const menuError = (newMessage) => {
  return {
    type: 'MENU_ERROR',
    errorMessage: newMessage,
  }
}

export {
  menuLoaded,
  menuRequested,
  menuError,
  
}