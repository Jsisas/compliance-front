import moment, {MomentInput} from "moment";
import 'moment/locale/et';

export const dateFormat = "dddd, Do MMMM, YYYY";
export const date = (date?: MomentInput) => moment(date).locale("et");
