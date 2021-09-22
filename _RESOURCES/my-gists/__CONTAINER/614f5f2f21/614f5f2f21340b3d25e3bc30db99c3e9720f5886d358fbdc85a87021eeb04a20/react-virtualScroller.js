React.useEffect(() => {
		let animationFrame = 0
		function virtualScroller(targets, { offset, topOffset, bottomOffset } = {}) {
			offset ??= 0
			topOffset ??= offset ?? 0
			bottomOffset ??= offset ?? 0
			cancelAnimationFrame(animationFrame)
			animationFrame = window.requestAnimationFrame(() => {
				for (let x = 0, len = targets.length; x < len; x++) {
					let target = targets[x]
					const { top, bottom } = target.getBoundingClientRect()
					//
					// +----------+ <- offset
					// |//////////|
					// +----------+ <- t
					// |          |
					// |          |
					// +----------+ <- b
					// |//////////|
					// +----------+ <- offset
					//
					const t = -1 * bottom
					const b = (window.scrollY + top) - (window.scrollY + window.innerHeight)
					if (t > topOffset) {
						target.style.visibility = "hidden"
					} else if (b > bottomOffset) {
						target.style.visibility = "hidden"
						for (x++; x < len; x++) {
							target = targets[x]
							target.style.visibility = "hidden"
						}
						return
					} else {
						target.style.visibility = ""
					}
				}
			})
		}
		const targets = document.getElementsByClassName("searchResultsBtn")
		function handleScroll(e) {
			virtualScroller(targets, {
				offset: 2 * window.innerHeight,
			})
		}
		virtualScroller(targets, {
			offset: 2 * window.innerHeight,
		})
		document.addEventListener("scroll", handleScroll, false)
		return () => document.removeEventListener("scroll", handleScroll, false)
	}, [])