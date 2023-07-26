import type { Meta, StoryFn } from '@storybook/vue3'
import TextFieldInput from './TextFieldInput.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Inputs/TextFieldInput',
  component: TextFieldInput,
  tags: ['autodocs'],
  args: {
    onInput: action('Input changed')
  }
} as Meta<typeof TextFieldInput>

const Template: StoryFn<typeof TextFieldInput> = (args) => ({
  components: { TextFieldInput },
  setup() {
    return { args }
  },
  template: '<TextFieldInput v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {}

export const Mobile = Template.bind({})
Mobile.parameters = {
  ...Template.parameters,
  viewport: {
    defaultViewport: 'mobile1'
  }
}
