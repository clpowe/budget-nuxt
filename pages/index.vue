<template>
  <div
    class="grid h-screen w-screen place-content-center p-4 bg-neutral text-content-neutral"
  >
    <div class="mb-8 grid gap-4 justify-items-center">
      <div>
        <Logo />
      </div>
      <div>
        <TitleText />
      </div>
    </div>
    <form v-if="!isSignUp" @submit.prevent="signUp" class="grid">
      <input type="text" v-model="name" placeholder="Enter Your" />
      <input type="email" v-model="email" placeholder="Enter Email" />
      <input type="password" v-model="password" placeholder="Enter Password" />
      <p>{{ error }}</p>
      <button type="submit" class="btn btn-primary">
        <span>Sign up</span>
      </button>
    </form>
    <form v-else @submit.prevent="login" class="grid">
      <input type="email" v-model="email" placeholder="Enter Email" />
      <input type="password" v-model="password" placeholder="Enter Password" />
      <p>{{ error }}</p>
      <button type="submit" class="btn btn-primary">
        <span class="text-primary-content">Log in</span>
      </button>
    </form>
    <button @click="isSignUp = !isSignUp" class="clo text-neutral-content">
      <span v-show="isSignUp" class="text-neutral-content"
        >Create a new account</span
      >
      <span v-show="!isSignUp" class="text-neutral-content"
        >Have an account? <span class="font-bold">Log in instead</span></span
      >
    </button>
  </div>
</template>

<script setup>
const name = ref("");
const email = ref("");
const password = ref("");
const isSignUp = ref(false);
const error = ref("");
const client = useSupabaseAuthClient();

async function login() {
  const { error: err } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (err) {
    console.log(err);
    error.value = err.message;
    return;
  }
  navigateTo("/account/");
}

definePageMeta({
  layout: "login",
});

async function signUp() {
  const { data: userData, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) {
    console.error(error);
    throw new Error(error);
  }

  try {
    await client.from("profiles").insert([
      {
        user_id: userData.user.id,
        name: name.value,
        id: userData.user.id,
      },
    ]);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }

  navigateTo("/account/");
}
</script>

<style scoped>
input {
  @apply input input-bordered w-full max-w-md;
}

form {
  @apply grid gap-4;
}
</style>
