import type { Meta, StoryFn } from '@storybook/vue3'
import SubmitButton from './SubmitButton.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Basic/SubmitButton',
  component: SubmitButton,
  tags: ['autodocs'],
  args: {
    onClick: action('Clicked')
  }
} as Meta<typeof SubmitButton>

const Template: StoryFn<typeof SubmitButton> = (args) => ({
  components: { SubmitButton },
  setup() {
    return { args }
  },
  template: '<SubmitButton v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {}
