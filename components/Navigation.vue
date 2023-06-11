<template>
  <nav class="navbar bg-neutral text-neutral-content p-4">
    <div class="flex justify-between container mx-auto">
      <div class="">
        <NuxtLink to="/account" class="flex gap-2 items-center">
          <div>
            <Logo />
          </div>
          <div>
            <TitleText />
          </div>
        </NuxtLink>
      </div>

      <button @click="logout" class="btn btn-secondary">Sign Out</button>
    </div>
  </nav>
</template>

<script setup>
const user = useSupabaseUser();
const client = useSupabaseAuthClient();
const router = useRouter;

function logout() {
  client.auth.signOut();
  navigateTo("/");
}
</script>
