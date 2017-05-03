<template>
    <div class="daily-article">
        <div class="daily-article-title">{{ data.title }}</div>
        <div class="daily-article-content" v-html="data.body"></div>
        <div class="daily-comments" v-show="comments.length">
            <span>评论（{{ comments.length }}）</span>
            <div class="daily-comment" v-for="comment in comments">
                <div class="daily-comment-avatar">
                    <img :src="comment.avatar">
                </div>
                <div class="daily-comment-content">
                    <div class="daily-comment-name">{{ comment.author }}</div>
                    <div class="daily-comment-time" v-time="comment.time"></div>
                    <div class="daily-comment-text">{{ comment.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Time from '../directives/time';
    import $ from '../libs/util';
    export default {
        directives: { Time },
        props: {
            id: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                data: {},
                comments: []
            }
        },
        methods: {
            getArticle () {
                $.ajax.get('news/' + this.id).then(res => {
                    res.body = res.body
                        .replace(/src="http/g, 'src="' + $.imgPath + 'http');
                    res.body = res.body
                        .replace(/src="https/g, 'src="' + $.imgPath + 'https');
                    this.data = res;
                    window.scrollTo(0, 0);
                    this.getComments();
                })
            },
            getComments () {
                this.comments = [];
                $.ajax.get('story/' + this.id + '/short-comments').then(res => {
                    this.comments = res.comments.map(comment => {
                        // 将头像的图片地址转为代理地址
                        comment.avatar = $.imgPath + comment.avatar;
                        return comment;
                    });
                })
            }
        },
        watch: {
            id (val) {
                if (val) this.getArticle();
            }
        }
    };
</script>