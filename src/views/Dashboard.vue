<template>
  <div class="page">
    <Spinner v-if="!Agents && !Contacts" />
    <div class="dashboard">
      <div class="d-table">
        <h2>Contacts</h2>
        <div class="headers size-4">
          <div class="item">ID</div>
          <div class="item">Name</div>
          <div class="item">Email</div>
          <div class="item">Phone</div>
        </div>
        <div
          class="items size-4"
          v-for="(con, index) in Contacts"
          :key="con.id"
        >
          <div class="item">
            {{ index + 1 }}
          </div>
          <div class="item">
            {{ con["fields"].contact_name }}
            {{ con["fields"].contact_surname }}
          </div>
          <div class="item">
            {{ con["fields"].contact_email }}
          </div>
          <div class="item">
            {{ con["fields"].contact_phone }}
          </div>
        </div>
      </div>
      <div class="d-table">
        <h2>Agents</h2>
        <div class="headers size-3">
          <div class="item">ID</div>
          <div class="item">Name</div>
          <div class="item">Appointments</div>
        </div>
        <div
          class="items size-3"
          v-for="(agent, index) in Agents"
          :key="agent.id"
        >
          <div class="item">
            {{ index + 1 }}
          </div>
          <div class="item">
            {{ agent["fields"].agent_name }}
            {{ agent["fields"].agent_surname }}
          </div>
          <div class="item">
            {{
              agent["fields"].Appointments
                ? agent["fields"].Appointments.length
                : "0"
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Spinner from "../components/Spinner.vue";
export default {
  components: {
    Spinner,
  },
  async created() {
    this.$store.dispatch("showMenu", false);
    await this.getAllAppointments();
    await this.getAgents();
    await this.getContacts();
  },
  methods: {
    ...mapActions(["getAllAppointments", "getAgents", "getContacts"]),
  },
  computed: {
    ...mapGetters(["Agents", "Contacts"]),
  },
};
</script>
