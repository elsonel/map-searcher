import type { Meta, StoryFn } from '@storybook/vue3'
import CheckboxInput from './CheckboxInput.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Inputs/CheckboxInput',
  component: CheckboxInput,
  tags: ['autodocs'],
  args: {
    isInitialChecked: false,
    onInput: action('Input changed')
  }
} as Meta<typeof CheckboxInput>

const Template: StoryFn<typeof CheckboxInput> = (args) => ({
  components: { CheckboxInput },
  setup() {
    return { args }
  },
  template: '<CheckboxInput v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {}

export const InitiallyChecked = Template.bind({})
InitiallyChecked.args = {
  isInitialChecked: true
}

export const Mobile = Template.bind({})
Mobile.parameters = {
  ...Template.parameters,
  viewport: {
    defaultViewport: 'mobile1'
  }
}
