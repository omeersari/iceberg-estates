<template>
  <div class="page">
    <div class="top">
      <form @submit.prevent="filterAgents">
        <input
          type="text"
          placeholder="Filter by agent name"
          v-model="filter"
          class="mr-5"
        />
        <submit
          :buttonText="'Filter'"
          :submit="filterAgents"
          :className="'tertiary'"
          class="mr-5"
        />
      </form>
      <submit
        :buttonText="'Reset'"
        :submit="resetFilter"
        :className="'tertiary'"
      />
    </div>
    <div class="sort-date">
      <button @click="sortDates()" class="tertiary">Sort By Date</button>
    </div>
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
      <div v-if="Appointments.length == 0" class="error">No records found</div>
      <div
        v-for="(item, index) in Appointments"
        :key="index"
        class="app-table"
        :class="isPassive(index) ? 'isPassive' : ''"
      >
        <div class="item">
          <div class="responsive-label">ID:</div>
          <div>{{ index + 1 }}</div>
        </div>
        <div class="item">
          <div class="responsive-label">App. Date</div>
          <div>
            {{
              moment(item["fields"].appointment_date).format("DD-MM-YYYY HH:mm")
            }}
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
          <div>
            <button
              class="tertiary"
              :disabled="isPassive(index)"
              @click="onUpdate(item)"
            >
              EDIT
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="f-center">
      <button class="primary" @click="viewmore" ref="viewmore">
        View More
      </button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import Submit from "../components/Submit.vue";

export default {
  components: {
    Submit,
  },
  data() {
    return {
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
    ...mapGetters(["Appointments", "Len", "Offset", "Error"]),
  },
  methods: {
    ...mapActions([
      "getAppointments",
      "viewMore",
      "sortbyDate",
      "showMenu",
      "getUpdatingAdress",
    ]),
    isPassive(index) {
      const item = this.Appointments[index];
      const date = new Date().toISOString();
      if (date > item["fields"].appointment_date) {
        return true;
      } else {
        return false;
      }
    },
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
      if (this.filter) {
        this.Appointments.sort(function (a, b) {
          return (
            new Date(b["fields"].appointment_date) -
            new Date(a["fields"].appointment_date)
          );
        });
      } else {
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
      }
    },

    filterAgents() {
      this.$store.commit("FILTER_AGENT", this.filter);
      this.$refs["viewmore"].innerText = "End of Feed";
      this.$refs.viewmore.disabled = true;
      /*
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
    */
    },
    async onUpdate(item) {
      await this.getUpdatingAdress(item["fields"].appointment_postcode);
      this.$router.push({ name: "CreateAppointment", params: { item } });
    },
    async resetFilter() {
      await this.getAppointments();
      this.$refs["viewmore"].innerText = "View More";
      this.$refs.viewmore.disabled = false;
      this.filter = "";
    },
  },
};
</script>
