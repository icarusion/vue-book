<template>
    <div>
        <h1>首页</h1>
        {{ count }}
        <button @click="handleIncrement">+1</button>
        <button @click="handleDecrease">-1</button>
        <button @click="handleIncrementMore">+5</button>
        <div>{{ list }}</div>
        <div>{{ listCount }}</div>
        <button @click="handleActionIncrement">action +1</button>
        <button @click="handleAsyncIncrement">async +1</button>
        随机增加：
        <Counter :number="number"></Counter>
    </div>
</template>
<script>
    import Counter from './counter.vue';

    export default {
        components: {
            Counter
        },
        computed: {
            count () {
                return this.$store.state.count;
            },
            list () {
                return this.$store.getters.filteredList;
            },
            listCount () {
                return this.$store.getters.listCount;
            }
        },
        methods: {
            handleIncrement () {
                this.$store.commit('increment');
            },
            handleDecrease () {
                this.$store.commit('decrease');
            },
            handleIncrementMore () {
                this.$store.commit('increment', 5);
            },
            handleActionIncrement () {
                this.$store.dispatch('increment')
            },
            handleAsyncIncrement () {
                this.$store.dispatch('asyncIncrement').then(() => {
                    console.log(this.$store.state.count);
                });
            },
            handleAddRandom (num) {
                this.number += num;
            }
        },
        data () {
            return {
                number: 0
            }
        },
        created () {
            this.$bus.on('add', this.handleAddRandom);
        },
        beforeDestroy () {
            this.$bus.off('add', this.handleAddRandom);
        }
    }
</script>