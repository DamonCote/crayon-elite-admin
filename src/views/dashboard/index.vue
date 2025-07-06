<script setup>
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/PageHeader.vue";
</script>
<template>
    <Layout>
        <div class="page-title-box">
            <BRow class="align-items-center">
                <BCol md="5">
                    <PageHeader title="Dashboard" pagetitle="Dashboard" />
                </BCol>
                <BCol md="auto" class="ms-auto"> </BCol>
            </BRow>
        </div>

        <BRow>Dashboard</BRow>
    </Layout>
</template>
