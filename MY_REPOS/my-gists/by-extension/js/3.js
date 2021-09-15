// inspired by: https://alinacierdem.com/the-problem-with-async-generators/

function asyncGenerator(gen) {
	var awaiteds = new WeakSet();
	var unset = Symbol("unset");
	var returned = Symbol("returned");
	
	return function wrapped(...args){
		var def = deferred();
		var it = gen(pwait,...args);
		var ait = runner(it,def.pr);
		var aitRet = ait.return;
		ait.return = doReturn;
		return ait;
		
	
		// ***************************
	
		function doReturn(v){
			try {
				def.pr.resolved = true;
				def.resolve(returned);
				return it.return(v);
			}
			finally {
				aitRet.call(ait);
				ait.return = aitRet;
				def = ait = aitRet = null;
			}
		}
	};


	// ***************************
	
	function pwait(v) {
		var pr = Promise.resolve(v);
		awaiteds.add(pr);
		return pr;
	}

	async function *runner(it,complete) {
		var res;
		var excp = unset;
		
		try {
			while (!complete.resolved) {
				if (excp !== unset) {
					res = it.throw(excp);
				}
				else {
					res = it.next(res);
				}
				if (isPromise(res.value)) {
					if (awaiteds.has(res.value)) {
						awaiteds.delete(res.value);
						try {
							res = await Promise.race([
								complete,
								res.value,
							]);
							if (res === returned) {
								return;
							}
						}
						catch (err) {
							excp = err;
						}
					}
					else {
						res = yield res.value;
					}
				}
				else if (res.done) {
					return res.value;
				}
				else {
					res = yield res.value;
				}
			}
		}
		finally {
			it = complete = null;
		}
	}

	function isPromise(pr) {
		return (pr && typeof pr == "object" && typeof pr.then == "function");
	}
	
	function deferred() {
		var resolve;
		var pr = new Promise(function c(res){
			resolve = res;
		});
		return { pr, resolve };
	}
}