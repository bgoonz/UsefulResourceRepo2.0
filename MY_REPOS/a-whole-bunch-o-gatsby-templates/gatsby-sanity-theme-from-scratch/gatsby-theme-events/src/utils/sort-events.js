const sortEvents = (events) => {
  const endOfDay = (date) => new Date(date).setHours(23, 59, 59, 999)

  const upcoming = events.filter((event) => endOfDay(event.date) >= Date.now())

  const past = events
    .filter((event) => endOfDay(event.date) < Date.now())
    .reverse()

  return {
    upcoming,
    past,
  }
}

export default sortEvents
