<template>
    <div>{{ $route.params.id }}</div>
</template>
<script>
    export default {
        mounted () {
            console.log(this.$route);
        }
    }
</script>