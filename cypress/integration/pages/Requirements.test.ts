import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;

describe('When visiting requirements page', () => {
	before(() => {
		localStorage.setItem('auth', '{"token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjZiYzYzZTlmMThkNTYxYjM0ZjU2NjhmODhhZTI3ZDQ4ODc2ZDgwNzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjMzMTQ0NDAwODE4LTF2ZTU5NnZ0ZjV0djRnY2Nndmw3cW44bjVucmNqYm52LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjMzMTQ0NDAwODE4LTF2ZTU5NnZ0ZjV0djRnY2Nndmw3cW44bjVucmNqYm52LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyNzUyODQ0NTMyNTY5MDk4MDMxIiwiZW1haWwiOiJqb29zZXAuc2lzYXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJPYnU2SzUyN0NtZHZIRGkwNEF0SldnIiwibmFtZSI6Ikpvb3NlcCBTaXNhcyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHam1oMEJPbHNKcFd0Q3EzYlZlVEhHOUI1dE9WZEZrMmtxeTlqdHprSFU9czk2LWMiLCJnaXZlbl9uYW1lIjoiSm9vc2VwIiwiZmFtaWx5X25hbWUiOiJTaXNhcyIsImxvY2FsZSI6ImVuLUdCIiwiaWF0IjoxNTk3OTE0NjkxLCJleHAiOjE1OTc5MTgyOTEsImp0aSI6ImFhYTlmZjhjZjRmMjcxZTU2Zjc0ZjFkZjdlNDQ4M2MxZmFkYjM5Y2IifQ.X8sJ_mh4-zMZm08wQoJ-2B9EOEpfOIB8RmPlpIr6QmCacnBPLylUAKDqzo2yqemJeu855PGCWMEofddxh1dUnw-ZI6jlMYAoRmXw1GPi8aoejB9-ywCvTUyMy_0VceNPkOhImu7DqrkkGTzqcFFHZxUFtfaDuqiHHobqcUWJJuABQPlnxE6BYe9podhxi2kL-aPZCzzcq0CuqaZuosylPuhmX6a6PdVd-jckjj9D0njj44dP7sK6NQLlFJCRdvlbNbt8cQYgbYGjKDYnp9HI2QbAGH44SEpLQiCyFKVZb2hCxqhr12CbvIkJlM4TV8fl2wxSFUxhtvTu2H_p4456DA","user":{"id":"ae6d5f73-618f-4271-85e9-29903c4e1cb4","email":"joosep.sisas@gmail.com","name":"Joosep Sisas","picture":"https://lh3.googleusercontent.com/a-/AOh14Gjmh0BOlsJpWtCq3bVeTHG9B5tOVdFk2kqy9jtzkHU=s96-c","username":"joosep"}}');
		cy.visit('/regulations');
		cy.get('table td:nth-child(1) > a').click();
	});

	it('can go back', () => {
		cy.get('.anticon-left').click();
		cy.url().should('include', '/regulations');
		cy.get('table td:nth-child(1) > a').click();
	});

	describe('can filter', () => {
		it('by text', () => {
			const textInputSelector = 'div.ant-col-sm-8:nth-child(1) > span:nth-child(1) > input:nth-child(1)';
			const firstRowTitle = 'tr.ant-table-row:nth-child(2) > td:nth-child(2) > span:nth-child(1)';

			cy.get(firstRowTitle).invoke('text').then((text) => {
				const searchTerm = text.substr(0, 3).toLowerCase();
				cy.get(textInputSelector).type(searchTerm);
				cy.get('tbody > tr > td:nth-child(2) > span')
					.each((span: HTMLSpanElement[]) => {
						expect(span[0].textContent?.toLowerCase()).to.contain(searchTerm);
					});
			});
			cy.get(textInputSelector).clear();
		});
	});

	it('it can select all requirements', () => {
		const allSelectCheckboxSelector = '.ant-table-selection > label:nth-child(1) > span:nth-child(1) > input:nth-child(1)';
		cy.get(allSelectCheckboxSelector).check();
		cy.get('.ant-checkbox-input').parent().should('have.class', 'ant-checkbox ant-checkbox-checked');
		cy.contains('10 selected');
		cy.get(allSelectCheckboxSelector).uncheck();
	});

	//TODO Requirements does not have PATCH method
	it.skip('it can add existing control', () => {
		const firstRowCheckbox = 'tr.ant-table-row:nth-child(2) > td:nth-child(1) > label:nth-child(1) > span:nth-child(1) > input:nth-child(1)';
		const searchControlModalInputSelector = '.ant-modal-body input';
		cy.get(firstRowCheckbox).check();
		cy.contains('1 selected');

		cy.contains('Connect control').parent().click();
		cy.contains('Attach existing control').click();
		cy.get(searchControlModalInputSelector).type('Pri');

		cy.get('[data-testid=results] > div:nth-child(1) > span:nth-child(1)').first().then((ele) => {
			console.log(ele);
			const clickedControlTitle = ele.text();
			ele.trigger('mousedown');
			cy.contains('Attach control').parent().click();
			cy.get('.ant-modal-close-x').click();
			cy.get('tr.ant-table-row:nth-child(2) > td:nth-child(6)').contains(clickedControlTitle);
		});
	});

	it('it can add new control', () => {
		const firstRowCheckbox = 'tr.ant-table-row:nth-child(2) > td:nth-child(1) > label:nth-child(1) > span:nth-child(1) > input:nth-child(1)';
		cy.get(firstRowCheckbox).check();
		cy.contains('1 selected');

		cy.contains('Connect control').parent().click();
		cy.contains('New control').click();
		let randomString = Math.random().toString(36).substring(0, 8).replace(/[^\w\s]/gi, '');
		cy.get('#title').type('cypress-title-' + randomString);
		cy.get('.ql-editor').type('cypress-body-'.concat(randomString));
		cy.contains('Add assignees').prev().click();

		cy.get('.ant-select-dropdown').within((ele) => {
			cy.contains('Joosep Sisas').click();
		});

		cy.contains('Submit').click();
		cy.get('tr.ant-table-row:nth-child(2) > td:nth-child(6)').contains('cypress-title-' + randomString);
	});
});
