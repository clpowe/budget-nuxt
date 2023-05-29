<template>
  <nav class="navbar bg-neutral text-neutral-content p-4">
    <div class="flex justify-between container mx-auto">
      <div class="">
        <NuxtLink to="/account" class="flex gap-2 items-center">
          <img src="/logo.svg" height="32" alt="" class="h-12" />
          <img src="/name.svg" height="24" alt="" class="h-8" />
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
