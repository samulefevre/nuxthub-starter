<script setup lang="ts">
const { locale, t, setLocale } = useI18n()

const options = computed(() => [
  { value: 'en', label: t('locales.en') },
  { value: 'fr', label: t('locales.fr') },
])

function onLocaleChanged(locale: string) {
  setLocale(locale)
}
</script>

<template>
  <div>
    <form>
      <USelect
        v-model="locale"
        :options="options"
        @change="onLocaleChanged"
      />
    </form>
  </div>
</template>
