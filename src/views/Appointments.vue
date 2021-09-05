<template>
  <div class="table">
    <div class="app-table headers">
      <div>ID</div>
      <div @click="sortDates()" class="sort">Appointment Date</div>
      <div>Postal Code</div>
      <div>Contanct Phone</div>
      <div>Contact Name</div>
      <div>
        Agent Name
        <form @submit.prevent="filterAgents">
          <input type="text" placeholder="Filter" v-model="filter">
          <button>search</button>
        </form>
        
        
      </div>
      <div>Actions</div>
    </div>
    <div v-for="(item, index) in Appointments" :key="index" class="app-table">
      <div>{{ item.id }}</div>
      <div>
        {{ moment(item["fields"].appointment_date).format("DD-MM-YYYY") }}
      </div>
      <div>
        {{
          item["fields"].appointment_postcode
            ? item["fields"].appointment_postcode
            : "no post-code"
        }}
      </div>
      <div>
        {{
          item["fields"].contact_phone
            ? item["fields"].contact_phone[0]
            : "no phone"
        }}
      </div>
      <div>
        {{
          item["fields"].contact_name
            ? item["fields"].contact_name[0]
            : "no-name"
        }}
        {{
          item["fields"].contact_surname
            ? item["fields"].contact_surname[0]
            : "no-surname"
        }}
      </div>
      <div>
        {{
          item["fields"].agent_name ? item["fields"].agent_name[0] : "no-name"
        }}
        {{
          item["fields"].agent_surname
            ? item["fields"].agent_surname[0]
            : "no-surname"
        }}
      </div>
      <div><button>EDIT</button></div>
    </div>
    <button @click="viewmore" ref="viewmore">View More</button>
  </div>
</template>

<script>
import api from "../api/service";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      api,
      res: [],
      sort: true,
      moment,
      sortClicked: false,
      sorted: "",
      oldLen: "",
      filter: "",
    };
  },
  async created() {
    this.getAppointments();
    this.sortClicked = false;
  },
  computed: {
    ...mapGetters(["Appointments", "Len", "Offset"]),
  },
  methods: {
    ...mapActions(["getAppointments", "viewMore", "sortbyDate"]),
    async viewmore(event) {
      const target = event.target || event.srcElement;
      if (target.getAttribute("disabled")) {
        return;
      }
      target.textContent = "Loading";
      target.setAttribute("disabled", true)
      const data = {
        offset : this.Offset,
        sortClicked: this.sortClicked,
        sorted: this.sorted,
      };
      await this.viewMore(data);
      if (this.Offset == "") {
        target.textContent = "End of Feed";
        target.setAttribute('disabled', true);
      } else {
        target.disabled = false
        target.textContent = "View More";
        
      }
    },
    async sortDates(par) {
      this.sortClicked = true;
      this.$refs["viewmore"].innerText = "View More";
      this.$refs.viewmore.disabled = false;
      if (this.sort) {
        this.sorted = par = "desc";
        this.sort = !this.sort;
      } else {
        this.sorted = par = "asc";
        this.sort = !this.sort;
      }
      const data = {
        len : this.Len,
        par,
      }
      await this.sortbyDate(data);
    },
    async filterAgents() {
      const allName = this.filter.split(" ");
      let name = "";
      let surname = "";
      if (allName.length == 2) {
        name = allName[0]
        surname = allName[1]
      }
      else {
        name = this.filter.split(' ').slice(0, -1).join(' ')
        surname = this.filter.split(' ').slice(-1).join(' ')
      }
      const data = {
        name,
        surname
      }
      const res = await this.api.filterAgents(data)
      console.log(res)
    }
  },
};
</script>
