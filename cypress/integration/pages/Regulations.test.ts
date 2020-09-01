describe('When visiting regulations page', () => {

	before(() => {
		localStorage.setItem('auth', '{"token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjZiYzYzZTlmMThkNTYxYjM0ZjU2NjhmODhhZTI3ZDQ4ODc2ZDgwNzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjMzMTQ0NDAwODE4LTF2ZTU5NnZ0ZjV0djRnY2Nndmw3cW44bjVucmNqYm52LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjMzMTQ0NDAwODE4LTF2ZTU5NnZ0ZjV0djRnY2Nndmw3cW44bjVucmNqYm52LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyNzUyODQ0NTMyNTY5MDk4MDMxIiwiZW1haWwiOiJqb29zZXAuc2lzYXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJPYnU2SzUyN0NtZHZIRGkwNEF0SldnIiwibmFtZSI6Ikpvb3NlcCBTaXNhcyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHam1oMEJPbHNKcFd0Q3EzYlZlVEhHOUI1dE9WZEZrMmtxeTlqdHprSFU9czk2LWMiLCJnaXZlbl9uYW1lIjoiSm9vc2VwIiwiZmFtaWx5X25hbWUiOiJTaXNhcyIsImxvY2FsZSI6ImVuLUdCIiwiaWF0IjoxNTk3OTE0NjkxLCJleHAiOjE1OTc5MTgyOTEsImp0aSI6ImFhYTlmZjhjZjRmMjcxZTU2Zjc0ZjFkZjdlNDQ4M2MxZmFkYjM5Y2IifQ.X8sJ_mh4-zMZm08wQoJ-2B9EOEpfOIB8RmPlpIr6QmCacnBPLylUAKDqzo2yqemJeu855PGCWMEofddxh1dUnw-ZI6jlMYAoRmXw1GPi8aoejB9-ywCvTUyMy_0VceNPkOhImu7DqrkkGTzqcFFHZxUFtfaDuqiHHobqcUWJJuABQPlnxE6BYe9podhxi2kL-aPZCzzcq0CuqaZuosylPuhmX6a6PdVd-jckjj9D0njj44dP7sK6NQLlFJCRdvlbNbt8cQYgbYGjKDYnp9HI2QbAGH44SEpLQiCyFKVZb2hCxqhr12CbvIkJlM4TV8fl2wxSFUxhtvTu2H_p4456DA","user":{"id":"ae6d5f73-618f-4271-85e9-29903c4e1cb4","email":"joosep.sisas@gmail.com","name":"Joosep Sisas","picture":"https://lh3.googleusercontent.com/a-/AOh14Gjmh0BOlsJpWtCq3bVeTHG9B5tOVdFk2kqy9jtzkHU=s96-c","username":"joosep"}}');
		cy.visit('/regulations');
	});

	it('regulation name should link to requirements page', () => {
		cy.get('table td:nth-child(1) > a').should('have.attr', 'href').and('include', 'requirements');
	});

	it('all regulations column should link to requirements page', () => {
		cy.get('table td:nth-child(3) > a').should('have.attr', 'href').and('include', 'requirements');
	});

	it('without control column should link to requirements page', () => {
		cy.get('table td:nth-child(4) > a').should('have.attr', 'href').and('include', 'requirements');
	});

	it('controls failing column should link to requirements page', () => {
		cy.get('table td:nth-child(5) > a').should('have.attr', 'href').and('include', 'requirements');
	});
});

describe('when clicked', () => {
	beforeEach(() => {
		cy.server();
		cy.route('/api/v1/regulations').as('apiRegulations');
		cy.route('/api/v1/regulations/*').as('apiRegulationById');
		cy.route('/api/v1/requirements').as('apiRequirements');
		cy.route('/api/v1/controls').as('apiControls');

		localStorage.setItem('auth', '{"token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjZiYzYzZTlmMThkNTYxYjM0ZjU2NjhmODhhZTI3ZDQ4ODc2ZDgwNzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjMzMTQ0NDAwODE4LTF2ZTU5NnZ0ZjV0djRnY2Nndmw3cW44bjVucmNqYm52LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjMzMTQ0NDAwODE4LTF2ZTU5NnZ0ZjV0djRnY2Nndmw3cW44bjVucmNqYm52LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyNzUyODQ0NTMyNTY5MDk4MDMxIiwiZW1haWwiOiJqb29zZXAuc2lzYXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJPYnU2SzUyN0NtZHZIRGkwNEF0SldnIiwibmFtZSI6Ikpvb3NlcCBTaXNhcyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHam1oMEJPbHNKcFd0Q3EzYlZlVEhHOUI1dE9WZEZrMmtxeTlqdHprSFU9czk2LWMiLCJnaXZlbl9uYW1lIjoiSm9vc2VwIiwiZmFtaWx5X25hbWUiOiJTaXNhcyIsImxvY2FsZSI6ImVuLUdCIiwiaWF0IjoxNTk3OTE0NjkxLCJleHAiOjE1OTc5MTgyOTEsImp0aSI6ImFhYTlmZjhjZjRmMjcxZTU2Zjc0ZjFkZjdlNDQ4M2MxZmFkYjM5Y2IifQ.X8sJ_mh4-zMZm08wQoJ-2B9EOEpfOIB8RmPlpIr6QmCacnBPLylUAKDqzo2yqemJeu855PGCWMEofddxh1dUnw-ZI6jlMYAoRmXw1GPi8aoejB9-ywCvTUyMy_0VceNPkOhImu7DqrkkGTzqcFFHZxUFtfaDuqiHHobqcUWJJuABQPlnxE6BYe9podhxi2kL-aPZCzzcq0CuqaZuosylPuhmX6a6PdVd-jckjj9D0njj44dP7sK6NQLlFJCRdvlbNbt8cQYgbYGjKDYnp9HI2QbAGH44SEpLQiCyFKVZb2hCxqhr12CbvIkJlM4TV8fl2wxSFUxhtvTu2H_p4456DA","user":{"id":"ae6d5f73-618f-4271-85e9-29903c4e1cb4","email":"joosep.sisas@gmail.com","name":"Joosep Sisas","picture":"https://lh3.googleusercontent.com/a-/AOh14Gjmh0BOlsJpWtCq3bVeTHG9B5tOVdFk2kqy9jtzkHU=s96-c","username":"joosep"}}');
		cy.visit('/regulations');
	});
	describe('on "title"', () => {
		it('it should take to requirements page with all requirements filter', () => {
			cy.get('table td:nth-child(1) > a').click();
			cy.url().should('include', '/requirements');
			cy.wait(['@apiRegulations', '@apiRegulationById', '@apiRequirements', '@apiControls']);
			cy.contains('All requirements');
		});
	});

	describe('on "without control count"', () => {
		it('it should take to requirements page with all requirements filter', () => {
			cy.get('table td:nth-child(3) > a').click();
			cy.url().should('include', '/requirements');
			cy.wait(['@apiRegulations', '@apiRegulationById', '@apiRequirements', '@apiControls']);
			cy.contains('All requirements');
		});
	});

	describe('on "without control count"', () => {
		it('it should take to requirements page with all requirements filter', () => {
			cy.get('table td:nth-child(3) > a').click();
			cy.url().should('include', '/requirements');
			cy.wait(['@apiRegulations', '@apiRegulationById', '@apiRequirements', '@apiControls']);
			cy.contains('All requirements');
		});
	});
});
