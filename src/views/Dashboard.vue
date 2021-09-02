<template>
    <div id="dashboard">
        
        <div class="değiş">
               <main-card :title="'Appointments'" />
               <main-card :title="'Agents'" />
               <main-card :title="'Users'" />
        </div> 
    </div>
</template>


<script>
import MainCard from '../components/MainCard.vue'
export default {
    components: {
        MainCard
    }
}
</script>