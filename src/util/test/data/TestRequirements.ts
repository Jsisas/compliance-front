import { Requirement } from '../../../redux/Requirement/RequirementSlice';

export const testRequirements: Requirement[] = [
	{
		id: 'e6d9d11e-f662-4102-a48c-8eaa1e4dade3',
		chapter_name: 'Equipment',
		chapter_number: '11.2',
		controls: [],
		description: 'Equipment should be correctly maintained to ensure its continued availability and integrity.',
		paragraph_number: '11.2.4',
		regulations: [],
		statistics: { controls_total: 20, controls_failing: 0 },
		title: 'Equipment maintenance',
	},
	{
		id: '005034f1-c4f6-4b2b-8825-175c1d5de2f9',
		chapter_name: 'Information Classification',
		chapter_number: '8.2',
		controls: [],
		description:
			'Information should be classified in terms of legal requirements, value, criticality and sensitivity to unauthorised disclosure or modification.',
		paragraph_number: '8.2.1',
		regulations: [],
		statistics: { controls_total: 0, controls_failing: 0 },
		title: 'Classification of information',
	},
	{
		id: '979a092e-2b5b-4fa9-858d-641104dc9d85',
		chapter_name: 'Information Security Policy',
		chapter_number: '5.1',
		controls: [],
		description:
			'A set of policies for information security should be defined, approved by management, published and communicated to employees and relevant external parties.',
		paragraph_number: '5.1.1',
		regulations: [],
		statistics: { controls_total: 3, controls_failing: 1 },
		title: 'Policies for information security',
	},
	{
		id: '0f7d4d87-47fa-4d07-9dc4-f55ba22229d7',
		chapter_name: 'Information Security Policy',
		chapter_number: '5.1',
		controls: [],
		description:
			'The policies for information security should be reviewed at planned intervals or if significant changes occur to ensure their continuing suitability, adequacy and effectiveness.',
		paragraph_number: '5.1.2',
		regulations: [],
		statistics: { controls_total: 1, controls_failing: 1 },
		title: 'Review of Information Security Policy',
	},
];
