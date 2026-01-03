<template>
  <div>
    <h1 class="font font-bold text-2xl mb-4">
      Login
    </h1>

    <div class="flex flex-col gap-6">
      <AuthFormGoogle />
      <AuthFormGithub />
      <USeparator label="Or" />
      <AuthFormEmail />
    </div>
  </div>
</template>
