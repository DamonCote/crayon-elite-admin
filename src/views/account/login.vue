<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import store from "@/state/store";

const formRef = ref(null);
const formState = reactive({
    username: "administrator",
    password: "crayonDev888",
});
const rules = {
    username: [
        {
            required: true,
            message: "Please input your username",
            trigger: "blur",
        },
    ],
    password: [
        {
            // crayonDev888
            required: true,
            message: "Please input your password",
            trigger: "blur",
        },
    ],
};
const loginError = computed(() => store.getters["authentication/error"]);
const authorized = computed(() => store.getters["authentication/authorized"]);
const loginAction = (payload) => {
    store.dispatch("authentication/login", payload);
};
const loading = ref(false);
const submitLoginForm = async () => {
    formRef.value
        .validate()
        .then(() => {
            loading.value = true;
            loginAction({ ...formState });
        })
        .catch((err) => {
            // console.log(err);
        });
};

watch(loginError, (val) => {
    if (val) {
        loading.value = false;
    }
});

const router = useRouter();
watch(
    () => authorized.value,
    (newValue) => {
        if (newValue) {
            router.push("/");
        }
    },
    { deep: true }
);
</script>

<template>
    <section
        class="auth-page-wrapper d-flex align-items-center justify-content-center min-vh-100"
    >
        <BContainer fluid>
            <BRow>
                <BCol xxl="6" md="12" class="auth-left">
                    <div class="auth-left-inner">
                        <div class="info">
                            <div class="auth-title">
                                <h1>Crayon Elite Admin</h1>
                            </div>
                            <p>
                                CrayonElite Admin is a sleek, high-performance
                                admin dashboard template designed to streamline
                                the development of modern web applications.
                            </p>
                        </div>
                    </div>
                </BCol>
                <BCol xxl="6" class="mx-auto auth-right">
                    <div class="auth-form-section">
                        <div class="text-center mt-5">
                            <h3 class="auth-form-title">Welcome Back</h3>
                            <p class="text-muted">
                                Sign in to continue to Crayon Elite Admin.
                            </p>
                        </div>
                        <div class="p-2 mt-5">
                            <BAlert
                                variant="danger"
                                v-if="loginError"
                                :model-value="true"
                                class="mb-4"
                            >
                                <div class="alert-body">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0 me-3">
                                            <i class="fa fa-info-circle"></i>
                                        </div>
                                        <div class="flex-grow-1 text-left">
                                            <p>
                                                {{
                                                    loginError.message ||
                                                    loginError.error
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </BAlert>
                            <a-form
                                :model="formState"
                                layout="vertical"
                                ref="formRef"
                                :rules="rules"
                            >
                                <BRow>
                                    <BCol lg="12">
                                        <a-form-item
                                            label="Username"
                                            name="username"
                                        >
                                            <a-input
                                                size="large"
                                                autocomplete="off"
                                                v-model:value="
                                                    formState.username
                                                "
                                                placeholder="Enter your username"
                                            />
                                        </a-form-item>
                                    </BCol>
                                    <BCol lg="12">
                                        <a-form-item
                                            label="Password"
                                            name="password"
                                        >
                                            <a-input-password
                                                size="large"
                                                autocomplete="off"
                                                v-model:value="
                                                    formState.password
                                                "
                                                placeholder="Enter your password"
                                            />
                                        </a-form-item>
                                    </BCol>

                                    <BCol lg="12" class="mt-4">
                                        <a-button
                                            type="primary"
                                            size="large"
                                            class="w-full"
                                            :loading="loading"
                                            @click="submitLoginForm"
                                        >
                                            Sign In
                                        </a-button>
                                    </BCol>
                                </BRow>
                            </a-form>

                            <div class="text-center mt-5">
                                <p class="mb-0">
                                    Don't have an account ?
                                    <router-link
                                        to="/register"
                                        class="fw-semibold text-secondary text-decoration-underline"
                                    >
                                        SignUp</router-link
                                    >
                                </p>
                            </div>
                        </div>
                    </div>
                </BCol>
            </BRow>
        </BContainer>
    </section>
</template>
