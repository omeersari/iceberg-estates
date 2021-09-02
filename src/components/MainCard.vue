<template>
    <div class="main-card">
        <h3> {{title}} </h3>
    </div>
</template>


<script>
export default {
    props: {
        title: {
            type : String,
            required: true,
        },
    }
}
</script>