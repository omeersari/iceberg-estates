<template>
  <div class="form">
    <h2>Create application</h2>
    <form class="application-form">
      <div class="user-input">
        <my-label :label="'Post Code'" />
        <input type="text" class="primary" disabled v-model="postCode" />
      </div>
      <div class="user-input">
        <my-label :label="'Date'" />
        <vc-date-picker
          v-model="dataForm.date"
          mode="dateTime"
          :masks="masks"
          is24hr
          :minute-increment="5"
          :min-date="new Date()"
          :timezone="'UTC'"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <input
              placeholder="Pick a Date"
              class="primary"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </vc-date-picker>
      </div>
      <div class="user-input">
        <my-label :label="'Contact'" />
        <select v-model="dataForm.contact">
          <option value="" selected disabled>Please select a contact</option>
          <option
            v-for="(contact, index) in contacts"
            :key="index"
            :value="contact.id"
          >
            {{ contact["fields"].contact_name }}
            {{ contact["fields"].contact_surname }}
          </option>
        </select>
        <router-link to="/createcontact" class="minor-link"
          ><i class="fas fa-plus"></i> Create a new contact</router-link
        >
      </div>
      <div class="user-input">
        <my-label :label="'Agent'" />
        <select v-model="dataForm.agent">
          <option value="" selected disabled>Please assign an agent</option>
          <option
            v-for="(agent, index) in agents"
            :key="index"
            :value="agent.id"
          >
            {{ agent["fields"].agent_name }} {{ agent["fields"].agent_surname }}
          </option>
        </select>
        <router-link to="/createagent" class="minor-link"
          ><i class="fas fa-plus"></i> Create a new agent</router-link
        >
      </div>
      <div class="user-input">
        <submit
          :submit="createApplication"
          :buttonText="updatingItem ? 'UPDATE' : 'CREATE'"
          :className="'secondary'"
          class="create-button"
          :class="updatingItem ? 'tertiary' : ''"
        />
      </div>
    </form>
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import MyLabel from "./MyLabel.vue";
import api from "../api/service";
import moment from "moment";
import Submit from "./Submit.vue";

export default {
  components: {
    MyLabel,
    Submit,
  },
  props: {
    agents: {
      type: Array,
    },
    postCode: {
      type: String,
      required: false,
    },
    contacts: {
      type: Array,
    },
    updatingItem: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      moment,
      api,
      dataForm: {
        date: "",
        contact: "",
        agent: "",
      },
      masks: {
        inputDateTime24hr: "DD-MM-YYYY HH:mm",
      },
    };
  },
  created() {
    if (this.updatingItem) {
      this.dataForm.date = this.updatingItem["fields"].appointment_date;
      this.dataForm.contact = this.updatingItem["fields"].contact_id[0];
      this.dataForm.agent = this.updatingItem["fields"].agent_id[0];
    }
  },
  computed: {
    error() {
      return this.$store.getters.Error;
    },
  },
  methods: {
    async createApplication() {
      if (
        this.postCode &&
        this.dataForm.date &&
        this.dataForm.contact &&
        this.dataForm.agent
      ) {
        if (!this.updatingItem) {
          this.$store.dispatch("createError", "");
          const data = {
            records: [
              {
                fields: {
                  appointment_date: this.dataForm.date,
                  appointment_postcode: this.postCode,
                  contact_id: [this.dataForm.contact],
                  agent_id: [this.dataForm.agent],
                },
              },
            ],
          };
          const type = "create";
          this.$emit("appCreated", data, type);
        } else {
          this.$store.dispatch("createError", "");
          const data = {
            records: [
              {
                id: this.updatingItem.id,
                fields: {
                  appointment_date: this.dataForm.date,
                  appointment_postcode: this.postCode,
                  contact_id: [this.dataForm.contact],
                  agent_id: [this.dataForm.agent],
                },
              },
            ],
          };
          const type = "update";
          this.$emit("appCreated", data, type);
        }
      } else {
        this.$notify({
          group: "add",
          title: "Error",
          text: "An error occured. Read error message please.",
          type: "error",
          duration: 4000
        })
        this.$store.dispatch(
          "createError",
          "Please make sure all fields are filled"
        );
      }
    },
    resetForm() {
      this.dataForm = {
        date: "",
        contact: "",
        agent: "",
      };
    },
  },
  beforeDestroy() {
    this.$store.dispatch("createError", "");
  },
};
</script>
