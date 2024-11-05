<template>
    <div class="article">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
    </div>
</template>

<script>
export default {
    name: 'ArticleSingle',
    props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.article {
    padding: 20px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.article h2 {
    margin-top: 0;
    color: #333;
}

.article p {
    color: #666;
}
</style>