// Promise.all: if one promise rejects, all fail.
const [dogs, cats, possums] = await Promise.all([
    getDogs(),
    getCats(),
    getPossums()
])

// Promise.allSettled: if one rejects, 
// the others will still go through!
const allRequests = await Promise.allSettled([
    getDogs(),
    getCats(),
    getPossums()
])
const [dogs, cats, possums] = allRequests.map((result) =>
    result.status === 'fulfilled' ? result.value : undefined
)
