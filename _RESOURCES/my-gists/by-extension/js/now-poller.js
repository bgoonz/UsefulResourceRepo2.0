const tiny = require('tiny-json-http')
const schedule = require('node-schedule')

const {
	error,
	log
} = console

function main() {

	schedule.scheduleJob('* * * * *', async () => {
		const urls = [
			`https://XXX.now.sh/`,
			`https://YYY.now.sh/`
		]
		for (let url of urls) {
			try {
				const ping = await tiny.get({
					url
				})
				log(`Status: ${ping.body.status} | Timestamp: ${ping.body.timestamp}`)
			} catch (e) {
				error(e)
			}
		}
	})
}

main()
