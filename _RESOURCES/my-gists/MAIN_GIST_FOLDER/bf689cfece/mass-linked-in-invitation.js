processInvitations().catch(console.log);

function delay(ms) { return new Promise(res => setTimeout(res,ms)); }

async function processInvitations() {
	var cards = [...document.querySelectorAll("li.invitation-card")];

	var acceptCards = cards.filter(card => {
	   var title = (card.querySelectorAll(".invitation-card__subtitle")[0] || {}).innerHTML || "";
	   return accept(title);  
	});

	var rejectCards = cards.filter(card => {
	   var title = (card.querySelectorAll(".invitation-card__subtitle")[0] || {}).innerHTML || "";
	   return !accept(title);  
	});
	
	for (let card of acceptCards) {
		let acceptBtn = card.querySelectorAll(".invitation-card__action-btn.artdeco-button--secondary")[0];
		if (acceptBtn) {
			acceptBtn.click();
			await delay(500);
		}
	}

	for (let card of rejectCards) {
		let rejectBtn = card.querySelectorAll(".invitation-card__action-btn.artdeco-button--tertiary")[0];
		if (rejectBtn) {
			rejectBtn.click();
			await delay(500);
		}
	}
	
	
	var nextBtn = document.querySelectorAll(".artdeco-pagination__button--next")[0];
	if (nextBtn) {
		nextBtn.click();
		await delay(5000);
	
		processInvitations().catch(console.log);
	}
	else {
		alert("No more found!");
	}
}

function accept(title) {
	return ( 
		Boolean(/\bmural(ista)?\b/i.test(title)) ||
		(
			Boolean(/\b(design|architect|ui|ux|freelancer?|angular|react|vue|\.net|full[\s\-]stack|dev|programm(er|ing)|code|developer|software|js|javascript|mobile|web|engineer(ing)?|application|front[\s\-]?end|back[\s\-]?end|tech(nology|nical)?|computer|science|architect|consult(ant|ing))\b/i.test(title)) &&
			!Boolean(/\b(upwork|java|ceo|cfo|cto|talent|acquisition|looking|student|trainee|recruit(er|ing)|hiring|staffing|opportunit(y|ies)|manager|analyst|business|financial|found(er|ing)|blockchain|crypto)\b/i.test(title))
		)
	);
}