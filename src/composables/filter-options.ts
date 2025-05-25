import { MaybeRef, ref, unref } from 'vue'

export function useFilterOptions(options: MaybeRef<string[]>) {
  const filteredOptions = ref([])
  function filterFn(val, update) {
    update(() => {
      if (!val) {
        filteredOptions.value = unref(options)
      } else {
        filteredOptions.value = unref(options).filter(v => v.toLowerCase().includes(val.toLowerCase()))
      }
    })
  }
  return {
    filteredOptions,
    filterFn
  }
}
