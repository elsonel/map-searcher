import type { Meta, StoryFn } from '@storybook/vue3'
import InputBox from './InputBox.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Basic/InputBox',
  component: InputBox,
  tags: ['autodocs'],
  args: {
    onInput: action('Input changed')
  }
} as Meta<typeof InputBox>

const Template: StoryFn<typeof InputBox> = (args) => ({
  components: { InputBox },
  setup() {
    return { args }
  },
  template: '<InputBox v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {}
