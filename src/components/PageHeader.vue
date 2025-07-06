<script>
export default {
    props: {
        title: {
            type: String,
            default: "",
        },
        pagetitle: {
            type: String,
            default: "",
        },
    },
};
</script>

<template>
    <h4>{{ title }}</h4>
    <ol class="breadcrumb m-0">
        <li class="breadcrumb-item">
            <BLink href="javascript: void(0);" class="text-reset">{{
                pagetitle
            }}</BLink>
        </li>
        <li class="breadcrumb-item active">{{ title }}</li>
    </ol>
</template>
