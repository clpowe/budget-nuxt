<template>
  <div
    class="grid h-screen w-screen place-content-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500 to-cyan-600"
  >
    <div class="mb-6 grid gap-2 justify-items-center">
      <img src="/logo.svg" height="80" alt="" class="w-20 h-20" />
      <img src="/name.svg" height="48" alt="" class="h-12" />
    </div>
    <form v-if="!isSignUp" @submit.prevent="signUp" class="grid">
      <input type="text" v-model="name" placeholder="Enter Your" />
      <input type="email" v-model="email" placeholder="Enter Email" />
      <input type="password" v-model="password" placeholder="Enter Password" />
      <button type="submit" class="btn btn-sm btn-secondary">
        <span>Sign up</span>
      </button>
    </form>
    <form v-else @submit.prevent="login" class="grid">
      <input type="email" v-model="email" placeholder="Enter Email" />
      <input type="password" v-model="password" placeholder="Enter Password" />
      <button type="submit" class="btn btn-sm btn-secondary">
        <span>Log in</span>
      </button>
    </form>
    <button @click="isSignUp = !isSignUp">
      <span v-show="isSignUp">Create a new account</span>
      <span v-show="!isSignUp"
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
const client = useSupabaseAuthClient();

async function login() {
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    console.log(error);
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
