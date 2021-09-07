<template>
  <div class="appointments">
    <form @submit.prevent="filterAgents">
      <input type="text" placeholder="Filter by agent name" v-model="filter" />
      <button>Filter</button>
    </form>
    <button @click="sortDates()" class="sort-by-date">Sort By Date</button>
    <div class="table">
      <div class="app-table headers">
        <div>ID</div>
        <div @click="sortDates()" class="sort">
          App. Date <i class="fas fa-sort"></i>
        </div>
        <div>Postal Code</div>
        <div>Phone</div>
        <div>Contact Name</div>
        <div>Agent Name</div>
        <div>Actions</div>
      </div>
      <div v-for="(item, index) in Appointments" :key="index" class="app-table">
        <div class="item">
          <div class="responsive-label">ID:</div>
          <div>{{ index + 1 }}</div>
        </div>
        <div class="item">
          <div class="responsive-label">App. Date</div>
          <div>
            {{ moment(item["fields"].appointment_date).format("DD-MM-YYYY") }}
          </div>
        </div>
        <div class="item">
          <div class="responsive-label">Post Code:</div>
          <div>
            {{
              item["fields"].appointment_postcode
                ? item["fields"].appointment_postcode
                : "no post-code"
            }}
          </div>
        </div>
        <div class="item">
          <div class="responsive-label">Phone:</div>
          <div>
            {{
              item["fields"].contact_phone
                ? item["fields"].contact_phone[0]
                : "no phone"
            }}
          </div>
        </div>
        <div class="item">
          <div class="responsive-label">Contact Name:</div>
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
        </div>
        <div class="item">
          <div class="responsive-label">Agent Name:</div>
          <div>
            {{
              item["fields"].agent_name
                ? item["fields"].agent_name[0]
                : "no-name"
            }}
            {{
              item["fields"].agent_surname
                ? item["fields"].agent_surname[0]
                : "no-surname"
            }}
          </div>
        </div>
        <div class="item">
          <div class="responsive-label">Action:</div>
          <div><button class="edit">EDIT</button></div>
        </div>
      </div>
    </div>
    <button class="view-more" @click="viewmore" ref="viewmore">
      View More
    </button>
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
    this.showMenu(false);
  },
  computed: {
    ...mapGetters(["Appointments", "Len", "Offset"]),
  },
  methods: {
    ...mapActions(["getAppointments", "viewMore", "sortbyDate", "showMenu"]),
    async viewmore(event) {
      const target = event.target || event.srcElement;
      if (target.getAttribute("disabled")) {
        return;
      }
      target.textContent = "Loading";
      target.setAttribute("disabled", true);
      const data = {
        offset: this.Offset,
        sortClicked: this.sortClicked,
        sorted: this.sorted,
        len: this.Len,
      };
      await this.viewMore(data);
      if (this.Offset == "") {
        target.textContent = "End of Feed";
        target.setAttribute("disabled", true);
      } else {
        target.disabled = false;
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
        len: this.Len,
        offset: this.Offset,
        par,
      };
      await this.sortbyDate(data);
      if (this.Offset == "") {
        this.$refs["viewmore"].innerText = "End of Feed";
        this.$refs.viewmore.disabled = true;
      } else {
        this.$refs["viewmore"].innerText = "View More";
        this.$refs.viewmore.disabled = false;
      }
    },
    async filterAgents() {
      const allName = this.filter.split(" ");
      let name = "";
      let surname = "";
      if (allName.length == 2) {
        name = allName[0];
        surname = allName[1];
      } else {
        name = this.filter.split(" ").slice(0, -1).join(" ");
        surname = this.filter.split(" ").slice(-1).join(" ");
      }
      const data = {
        name: [name],
        surname: [surname],
      };
      const res = await this.api.filterAgents(data);
      console.log(res);
    },
  },
};
</script>
