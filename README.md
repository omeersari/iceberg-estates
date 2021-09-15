# iceberg-estates

# Project setup

Download this project and run

With npm:

```
npm install
npm run serve
```

With yarn:

```
yarn install
yarn serve
```


# Used Tech and Libraries

- Vue2 is used with Vuex and Vue-Router.
- SASS is used for styling.
- moment.js is used for dates.
- For Google-maps vue2-google-maps is used.
- For notifications vue-notification is used.
- To pick a date v-calendar is used.
- For API requests axios is used.
- A spinner is used from epic-spinners.
- To style code, prettier and eslint are used.
- Airtable API, postcodes.io API and Google Maps API are used.

# Pages

### Homepage

A simple homepage. There is no real authentication here. Just a simple if-else to illustrate login.

You can login with username: [admin] and password [1234].

### Dasboard

In dashboard, we can the see contacts and agents list. Where agent_id and contact_id aren't empty.

### Appointments

In this page, we can see all the appointments where contact_name isn't empty. 10 appointments are viewable at first unless we click on the view more button. View more button will be active until we see all the appointments.

The appoinments which are out-of date are simply clarified with a gray background. For these appointments edit button is disabled.

We can sort the appointments by date with clicking 'APP. DATE' on header. And with edit button we can update the active appointments.

For filtering appointments I coulnd't use the Airtable API. Instead I filtered the appointments locally by agent name. Sorting by date is only available for 'desc' when filtered. Reset button simply resets the filter and returns the original appointments table.

### Create Appointment

We can create a new appointment by filling all the fields. For post code field, it is disabled and it will be shown after a location is selected from the map. If no post code, we need to select another place.

When we select the location, we can set up a travel mode to see the distance and duration with the mode.

After all required fields, when we submit the form, it is controlled if the agent is busy or not during the appointment. (Travel duration is also taken into account.) For previous appointments travel time is taken into account as 2 hours. 1 hour for going to location and 1 hour for coming back each. 

For all appointments the duration of the appointment is 1 hour.

I basically control the date and time in controlAgentsTime.js in plugins folder. If agent isn't busy during the new date, the new appointment can be created. After creation, the time that agent should leave the office is shown below the map with the directions on the map.

For updating the existing appointment, this page is also used. If Post code isn't valid, Post Code field is again filled with 'No Post Code' found and user should select a new location on the map.

### Create Contact

We can simply create a new contact by filling all the fields.


### Create Agent

We can simply create a new agent by filling all the fields.


