import { RequestMethod } from './ControlTestUtil';

export class TaskTestUtil {
	static fillTaskUpsertForm(method: RequestMethod): string {
		cy.server();
		if (method == RequestMethod.PATCH) {
			cy.route(method, '/api/v1/tasks/*').as('upsert-task');
		} else {
			cy.route('POST', '/api/v1/tasks').as('upsert-task');
		}

		const randomString = Math.random()
			.toString(36)
			.substring(0, 8)
			.replace(/[^\w\s]/gi, '');

		cy.get('#title').type('cypress-title-' + randomString);
		cy.get('.ql-editor').type('cypress-body-'.concat(randomString));
		cy.contains('Add assignees').prev().click();

		cy.get('.ant-select-dropdown').within((ele) => {
			cy.contains('Joosep Sisas').click();
		});

		cy.get('.ant-modal-body').within(() => {
			cy.get('.ant-btn').contains('Add task').click();
		});
		//TODO Cannot create a task
		cy.wait('@upsert-task').should('have.property', 'status', 422);
		return randomString;
	}
}
