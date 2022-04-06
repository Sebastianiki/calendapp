import moment from "moment";

export const stringToDate = (string) => {
  return moment(string).toDate()
}