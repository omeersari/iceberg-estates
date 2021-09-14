import moment from "moment";

export const control = {
  controlTime: (data, agentTimes) => {
    const { agent_id, appointment_date } = data.fields;
    const appDate = moment(appointment_date).toDate();
    const agentArray = agentTimes
      .filter((el) => el.agent_id == agent_id[0])
      .filter(
        (agent) =>
          moment(agent.busyTime).format("MM/DD/YYYY") ==
          moment(appDate).format("MM/DD/YYYY")
      );
    const result = agentArray.every((element) => {
      if (element.depTime && element.arrTime) {
        // For new appointments
        if (moment(appDate).isBetween(element.depTime, element.arrTime)) {
          // new appointment cross
          return false;
        } else {
          // suitable for new appointments
          return true;
        }
      } // For previous appointments
      else {
        const busydate = moment(element.busyTime).toDate();
        const depTime = moment(busydate).subtract(1, "hours").toDate();
        const returnTime = moment(busydate).add(2, "hours").toDate();
        if (moment(appDate).isBetween(depTime, returnTime)) {
          // previous date time is existing
          return false;
        } else {
          // suitable for previous appointments date
          return true;
        }
      }
    });
    return result;
  },
};
