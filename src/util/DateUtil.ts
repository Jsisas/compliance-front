import moment, { MomentInput } from 'moment';
import 'moment/locale/et';

export const dateFormat = 'dddd, Do MMMM, YYYY';

export function date(date?: MomentInput): moment.Moment {
	return moment(date).locale('et');
}
