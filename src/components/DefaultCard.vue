<template>
<div class="def-card">
    <div class="title">
        {{ title }}
    </div>
    <div class="body">
        {{body}}
    </div>
    <div class="footer">
        {{footer}}
    </div>
</div>
</template>


<script>
export default {
    props: {
        title : {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: false,
            default: "0"
        },
        footer: {
            type: String,
            required: false
        }

    }
}
</script>