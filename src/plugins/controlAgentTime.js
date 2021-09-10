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
        //yeniler için
        if (moment(appDate).isBetween(element.depTime, element.arrTime)) {
          console.log("yeni randevu arasında çıktı uygun değil");
          return false;
        } else {
          console.log("yeni randevu uygun");
          return true;
        }
      } else {
        const busydate = moment(element.busyTime).toDate();
        const depTime = moment(busydate).subtract(1, "hours").toDate();
        const returnTime = moment(busydate).add(2, "hours").toDate();
        if (moment(appDate).isBetween(depTime, returnTime)) {
          console.log("eski randevu arasında çıktı");
          return false;
        } else {
          console.log("eski randevuya uygun");
          return true;
        }
      }
      // eski randevular için gidiş geliş süresi 1er saat ve randevu süresi de 1 saat olarak alınacak.
      // yeni randevular da gidiş ve geliş süresi google maps api kullanılarak hesaplanacaktır. randevu süresi de 1 saat olarak. Ona göre date seçiminden sonra
      // uyarı verilecektir.
    });
    return result
},
};
