<script setup>
import NavBar from "@/components/NavBar.vue";
import ImagePattern from "@/components/ImagePattern.vue";
import FooterComponents from "@/components/Footer.vue";
</script>

<template>
    <div id="layout-wrapper">
        <NavBar />
        <ImagePattern />
        <div class="main-content">
            <div class="page-content">
                <BContainer fluid>
                    <slot />
                </BContainer>
            </div>
            <FooterComponents />
        </div>
    </div>
</template>
