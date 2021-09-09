import moment from "moment";

export const control = {
    controlTime: (data, agentTimes) => {
        const { agent_id, appointment_date } = data.fields
        console.log("app_date", appointment_date)
        const agentArray = agentTimes.filter(el => el.agent_id == agent_id[0])
        agentArray.forEach(element => {
            const busydate = moment(element.busyTime).toDate()
            const depTime = moment(busydate).subtract(1, "hours").toDate()
            const returnTime = moment(busydate).add(2, "hours").toDate()
            console.log(busydate.getHours(), depTime.getHours(), returnTime.getHours())

            // eski randevular için gidiş geliş süresi 1er saat ve randevu süresi de 1 saat olarak alınacak.
            // yeni randevular da gidiş ve geliş süresi google maps api kullanılarak hesaplanacaktır. randevu süresi de 1 saat olarak. Ona göre date seçiminden sonra
            // uyarı verilecektir.
        });
    }
}