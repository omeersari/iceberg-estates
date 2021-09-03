import axios from 'axios'

const client = axios.create({
    baseURL: 'https://api.airtable.com/v0/appgykZBGTF92MnHu/',
    json: true
})

export default {
    async execute (method, resource, data) {
        return client({
            method,
            url : resource,
            data,
            headers: {
                "Authorization": "Bearer keyl0rWRPLI3beMUi"
            }
        }).then(req => {
            return req.data
        })
    },
    getAppointments () {
        return this.execute('get', "Appointments?pageSize=10&filterByFormula=NOT%28%7Bcontact_name%7D%20%3D%20%27%27%29")
    },
    viewMore(len, offset) {
        return this.execute('get', `Appointments?pageSize=${len}&offset=${offset}&filterByFormula=NOT%28%7Bcontact_name%7D%20%3D%20%27%27%29`)
    },
    createAppointments(data) {
        return this.execute('post', "Appointments", data)
    },
    sortDates() {
        return this.execute('post', "Appointments?sort%5B0%5D%5Bfield%5D=appointment_date&sort%5B0%5D%5Bdirection%5D=asc")
    }

}