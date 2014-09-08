(function(){
	var bookPrice = 8;
	var reductions = {
		"1": 1,
		"2": 0.95,
		"3": 0.9,
		"4": 0.8,
		"5": 0.75
	};
	
	// change la structure de donnée pour avoir le nombre de livres par titre
	function groupBooks(books){
		var groups = [0,0,0,0,0];
		for (var i=0; i < books.length; i++){
			groups[books[i]]++;
		}
		return groups;
	}
	
	// vérifie si tous les livres dispo sont en nombre <= 1
	function hasOnlyUniqueBooks(groups){
		for (var i=0; i < groups.length; i++){
			if (groups[i] > 1){
				return false;
			}
		}
		return true;
	}

	// calcul le prix d'un bundle de livre
	function calculateBundle(bundle){
		var toCalculate = 0;
		var getOneUniqueBook = true;
		for (var i=0; i<bundle.length;i++){
			if (bundle[i] === 1){
				toCalculate++;
			}
		}

		if (toCalculate === 0) return 0;
		return reductions[toCalculate] * bookPrice * toCalculate;
	}
	
	// vérifie si il ne reste plus aucun livre pour les bundles
	function finish(groups){
		for (var i=0; i < 5; i++){
			if (groups[i] > 0){
				return false;
			}
		}
		return true;
	}
	
	// memoire des meilleurs prix pour les groupes de livres
	var mem = {
	};
	function getPrice(group){
		var key = group[0]+','+group[1]+','+group[2]+','+group[3]+','+group[4]
		if (mem[key]){
			return mem[key];
		}
		var value = sum(group);
		mem[key] = value;
		return value;
	}
	
	var pad = "00000";	
	// calcul le prix pour l'ensemble des livres en param.
	// fait l'ensemble des chemins possible et conserve le meilleur
	function sum(groups){
		var min = 0;
		
		// cas de sortie
		if (finish(groups)){
			return 0;
		}
		if (hasOnlyUniqueBooks(groups)){
			return calculateBundle(groups);
		}
		//
		
		for (var i = 1; i < 32; i++){
			var subGroup = groups.slice(0); // copie 
	
			var bin = (i).toString(2);
			var text = pad.substring(0, pad.length - bin.length) + bin
			var bundle = [0,0,0,0,0];
			var stop = false;
			
			for(var j=0; j<5; j++){
				if (parseInt(text[j]) == 1){
					subGroup[j]--;
					if (subGroup[j] < 0){
						stop = true;
						break;
					}
					bundle[j] = 1;
				}
			}
			
			if (stop){
				continue;
			}

			var bundlePrice =  getPrice(bundle);
			var count = getPrice(subGroup) + bundlePrice;
			if (min > count || min === 0) {
				min = count;
			}
		}
		
		return min;
	}
	
	function calculate(books) {
		var groups = groupBooks(books);
		var price = sum(groups);
		return price;
		
		// deprecated ...
		// on calcul le prix d'un bundle, chaque bundle est constitué d'un livre de chaque groupe (qui contient strictement plus d'un livre)
		// + un livre d'un groupe qui contient un seul livre (le but est d'étaller les groupes contenant un livre dans plusieurs bundles)
		/*while (!hasOnlyUniqueBooks(groups)){
			price += extractAndCalculateBundle(groups, false);
		}*/
		// quand tous les groupes ne contiennent qu'un livre ou moins, on calcul le prix du dernier bundle avec tout les livres
		/*price += extractAndCalculateBundle(groups, true)*/
	}
	
	function montantTotal(books){
		if (books.length == 0) return 0;
		return calculate(books); 
	}

	window.KataPotter = {
		montantTotal: montantTotal
	};
	
	
	
	
	
	// deprecated ...
	function extractAndCalculateBundle(groups, largestPossible){
		var toCalculate = 0;
		var getOneUniqueBook = true;
		for (var i=0; i<groups.length;i++){
			if (groups[i] > 0){
				if (largestPossible || groups[i] > 1) {
					groups[i]--;
					toCalculate++;
				}
				else {
					if (getOneUniqueBook){
						groups[i]--;
						toCalculate++;
						getOneUniqueBook = false;
					}				
				}
			}
		}

		if (toCalculate === 0) return 0;
		return reductions[toCalculate] * bookPrice * toCalculate;
	}
}());