<template>
  <q-item>
    <q-item-section>{{ $t('modelInputItems.model') }}</q-item-section>
    <q-item-section side>
      <autocomplete-input
        class="w-250px"
        :model-value="model?.name"
        @update:model-value="setModel"
        :options="modelOptionsSource"
        filled
        dense
      >
        <template #option="{ opt, selected, itemProps }">
          <model-item
            :model="opt"
            :selected
            v-bind="itemProps"
          />
        </template>
      </autocomplete-input>
    </q-item-section>
  </q-item>
  <q-expansion-item
    :label="$t('modelInputItems.multimodalCapabilities')"
    :caption="$t('modelInputItems.multimodalCapabilitiesCaption')"
    v-if="model"
  >
    <q-item>
      <q-item-section>
        {{ $t('modelInputItems.userInputTypes') }}
      </q-item-section>
      <q-item-section side>
        <q-select
          class="xs:w-200px sm:w-250px"
          filled
          dense
          v-model="model.inputTypes.user"
          :options="multimodalTypeOptions"
          multiple
          use-chips
          emit-value
          map-options
        />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        {{ $t('modelInputItems.assistantMessageTypes') }}
      </q-item-section>
      <q-item-section side>
        <q-select
          class="xs:w-200px sm:w-250px"
          filled
          dense
          v-model="model.inputTypes.assistant"
          :options="multimodalTypeOptions"
          multiple
          use-chips
          emit-value
          map-options
        />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        {{ $t('modelInputItems.toolResultTypes') }}
      </q-item-section>
      <q-item-section side>
        <q-select
          class="xs:w-200px sm:w-250px"
          filled
          dense
          v-model="model.inputTypes.tool"
          :options="multimodalTypeOptions"
          multiple
          use-chips
          emit-value
          map-options
        />
      </q-item-section>
    </q-item>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { InputTypes, models } from 'src/utils/values'
import AutocompleteInput from './AutocompleteInput.vue'
import ModelItem from './ModelItem.vue'
import { Model } from 'src/utils/types'

const { modelOptionsSource } = defineProps<{
  modelOptionsSource?: string[]
}>()

const multimodalTypeOptions = [
  { label: 'text', value: 'text' },
  { label: 'image/*', value: 'image/*' },
  { label: 'audio/*', value: 'audio/*' },
  { label: 'application/pdf', value: 'application/pdf' }
]

const model = defineModel<Model>()
function setModel(name: string) {
  model.value = name ? models.find(m => m.name === name) || { name, inputTypes: InputTypes.default } : null
}
</script>
