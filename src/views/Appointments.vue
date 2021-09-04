<template>
  <div class="table">
    <div class="app-table headers">
      <div>ID</div>
      <div @click="sortDates()" class="sort">Appointment Date</div>
      <div>Postal Code</div>
      <div>Contanct Phone</div>
      <div>Contact Name</div>
      <div>Agent Name</div>
      <div>Actions</div>
    </div>
    <div v-for="(item, index) in pageOfItems" :key="index" class="app-table">
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
    <button @click="viewMore" ref="viewmore">View More</button>
  </div>
</template>


<script>
import api from "../api/service";
import moment from "moment";

export default {
  data() {
    return {
      api,
      res: [],
      sort: true,
      moment,
      pageOfItems: [],
      sortClicked : false,
      sorted: "",
    };
  },
  async created() {
    this.res = await this.api.getAppointments();
    this.pageOfItems = this.res.records;
    this.sortClicked = false
  },
  computed: {
    records() {
      return this.res.records;
    },
  },
  methods: {
    async viewMore(event) {
      const target = event.target || event.srcElement;
      if (target.getAttribute("disabled")) {
        return;
      }
      target.textContent = "Loading";
      const len = this.pageOfItems.length;
      const data = {
        sortClicked : this.sortClicked,
        sorted: this.sorted
      }
      const res = await this.api.viewMore(len + 10, data);
      if (res.records.length === this.pageOfItems.length) {
        target.textContent = "End of Feed";
        target.setAttribute("disabled", true);
      } else {
        this.pageOfItems = res.records;
        target.textContent = "View More";
      }
    },
    async sortDates(par) {
      this.sortClicked = true
      this.$refs["viewmore"].innerText = "View More";
      this.$refs.viewmore.disabled = false;
      if (this.sort) {
        par = "desc";
        this.sorted = "desc";
        this.sort = false;
      } else {
        par = "asc";
        this.sorted = "asc";
        this.sort = true;
      }
      const len = this.pageOfItems.length;
      const res = await this.api.sortDates(par, len);
      this.pageOfItems = res.records;
    },
  },
};
</script>