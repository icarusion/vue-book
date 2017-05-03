<template>
    <a class="daily-item">
        <div class="daily-img" v-if="data.images">
            <img :src="imgPath + data.images[0]">
        </div>
        <div
            class="daily-title"
            :class="{ noImg: !data.images}">{{ data.title }}</div>
    </a>
</template>
<script>
    import $ from '../libs/util';
    export default {
        props: {
            data: {
                type: Object
            }
        },
        data () {
            return {
                imgPath: $.imgPath
            }
        }
    }
</script>