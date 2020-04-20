import moment, {MomentInput} from "moment";
import 'moment/locale/et';

export const dateFormat = "dddd, MMMM Do YYYY, h:mm:ss a";
export const date = (date?: MomentInput) => moment(date).locale("et");