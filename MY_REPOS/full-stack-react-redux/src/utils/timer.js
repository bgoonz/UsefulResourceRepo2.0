export const delay = (time = 500) =>
  new Promise((resolve) => {
    process.env.NODE_ENV === 'development' && setTimeout(resolve, time)
  })
