export enum RequestMethod {
	PATCH = 'PATCH',
	POST = 'POSt',
}

export class ControlTestUtil {
	static fillControlUpsertForm(method: RequestMethod): string {
		cy.server();
		if (method == RequestMethod.PATCH) {
			cy.route(method, '/api/v1/controls/*').as('upsert-control');
		} else {
			cy.route(method, '/api/v1/controls').as('upsert-control');
		}

		const randomString = Math.random()
			.toString(36)
			.substring(0, 8)
			.replace(/[^\w\s]/gi, '');

		cy.get('#title')
			.clear()
			.type('cypress-title-' + randomString);
		cy.get('.ql-editor').clear().type('cypress-body-'.concat(randomString));

		cy.get('.ant-select-selection-search > input').click({ force: true });

		cy.get('.ant-select-dropdown').within((ele) => {
			cy.contains('Joosep Sisas').click();
		});

		cy.contains('Submit').click();
		cy.wait('@upsert-control').should('have.property', 'status', 200);
		return randomString;
	}

	static searchControlTableByText(searchTerm: string): void {
		const textInputSelector = '.ant-input';
		cy.get(textInputSelector).type(searchTerm);
		cy.get('tbody > tr > td:nth-child(1) > span').each((span: HTMLSpanElement[]) => {
			expect(span[0].textContent?.toLowerCase()).to.contain(searchTerm);
		});
		cy.get(textInputSelector).clear();
	}
}
