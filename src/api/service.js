import axios from "axios";

const client = axios.create({
  baseURL: "https://api.airtable.com/v0/appgykZBGTF92MnHu/",
  json: true,
});

export default {
  async execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: "Bearer keyl0rWRPLI3beMUi",
      },
    }).then((req) => {
      return req.data;
    });
  },
  getAllAppointments() {
    return this.execute(
      "get",
      "Appointments?filterByFormula=NOT%28%7Bcontact_name%7D%20%3D%20%27%27%29"
    );
  },
  getAppointments() {
    return this.execute(
      "get",
      "Appointments?pageSize=10&filterByFormula=NOT%28%7Bcontact_name%7D%20%3D%20%27%27%29"
    );
  },
  viewMore(data) {
    if (data.sortClicked) {
      return this.execute(
        "get",
        `Appointments?pageSize=10&filterByFormula=NOT%28%7Bcontact_name%7D%20%3D%20%27%27%29&sort%5B0%5D%5Bfield%5D=appointment_date&sort%5B0%5D%5Bdirection%5D=${data.sorted}&offset=${data.offset}`
      );
    } else {
      return this.execute(
        "get",
        `Appointments?pageSize=10&filterByFormula=NOT%28%7Bcontact_name%7D%20%3D%20%27%27%29&offset=${data.offset}`
      );
    }
  },
  sortDates(data) {
    return this.execute(
      "get",
      `Appointments?pageSize=${data.len}&filterByFormula=NOT%28%7Bcontact_name%7D%20%3D%20%27%27%29&sort%5B0%5D%5Bfield%5D=appointment_date&sort%5B0%5D%5Bdirection%5D=${data.par}`
    );
  },
  filterAgents(data) {
    return this.execute(
      "get",
      `Appointments?filterByFormula%3D%7Bagent_name%7D%20%3D%20%27${data.name}%20${data.surname}&filterByFormula=NOT%28%7Bcontact_id%7D%20%3D%20%27%27%29`
    );
  },
  getAgents() {
    return this.execute(
      "get",
      "Agents?filterByFromula=NOT%28%7Bagent_id%7D%20%3D%20%27%27%29"
    );
  },
  getContacts() {
    return this.execute(
      "get",
      "Contacts?filterByFromula=NOT%28%7Bcontact_id%7D%20%3D%20%27%27%29"
    );
  },
  createAppointment(data) {
    return this.execute("post", "Appointments", data);
  },
  updateAppointment(data) {
    return this.execute("patch", "Appointments", data);
  },
  createAgent(data) {
    return this.execute("post", "Agents", data);
  },
  createContact(data) {
    return this.execute("post", "Contacts", data);
  },
};
