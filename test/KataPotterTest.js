describe("kata potter", function () {
	
    it("should give the total price for no book", function () {
		var total = window.KataPotter.montantTotal([]);
		expect(total).toBe(0)
    });
	
	it("should give the total price for 1st book", function () {
		var total = window.KataPotter.montantTotal([0]);
		expect(total).toBe(8)
    });
	
	it("should give the total price for 2nd book", function () {
		var total = window.KataPotter.montantTotal([1]);
		expect(total).toBe(8)
    });
	
	it("should give the total price for 3rd book", function () {
		var total = window.KataPotter.montantTotal([2]);
		expect(total).toBe(8)
    });
	
	it("should give the total price for 4th book", function () {
		var total = window.KataPotter.montantTotal([3]);
		expect(total).toBe(8)
    });
	
	it("should give the total price for 5th book", function () {
		var total = window.KataPotter.montantTotal([4]);
		expect(total).toBe(8)
    });
	
	it("should give the total price for 3 identiques books", function () {
		var total = window.KataPotter.montantTotal([4, 4, 4]);
		expect(total).toBe(3*8)
    });
	
	it("should give the total price for 2 differents books", function () {
		var total = window.KataPotter.montantTotal([3, 4]);
		expect(total).toBe(2*8*0.95)
    });
	
	it("should give the total price for 3 differents books", function () {
		var total = window.KataPotter.montantTotal([0, 3, 4]);
		expect(total).toBe(3*8*0.90)
    });
	
	it("should give the total price for 4 differents books", function () {
		var total = window.KataPotter.montantTotal([0, 1, 3, 4]);
		expect(total).toBe(4 *8*0.8)
    });
	 
	it("should give the total price for 5 differents books", function () {
		var total = window.KataPotter.montantTotal([0, 1, 2, 3, 4]); 
		expect(total).toBe(5*8*0.75)
    });
	
	it("should give the total price for 5 differents books + 3 differents", function () {
		var total = window.KataPotter.montantTotal([0, 0, 1, 1, 2, 2, 3, 4]);
		expect(total).toBe(2 * (8 * 4 * 0.8))
    });
	
	
	it("should give the total price for ...", function () {
		var total = window.KataPotter.montantTotal([0, 0, 0, 0, 0, 
                  1, 1, 1, 1, 1, 
                  2, 2, 2, 2, 
                  3, 3, 3, 3, 3, 
                  4, 4, 4, 4]);
		expect(total).toBe(3 * (8 * 5 * 0.75) + 2 * (8 * 4 * 0.8))
    });
	
	it("Cas super tordu, obligé de calculer toutes les possibilités", function(){
	var total = window.KataPotter.montantTotal([0, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 4]);
		expect(total).toBe(78.8)
	});
	
	
	it("Cas super tordu bis, obligé de calculer toutes les possibilités", function(){
	var total = window.KataPotter.montantTotal([0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4]);
		expect(total).toBe(100)
	});
});