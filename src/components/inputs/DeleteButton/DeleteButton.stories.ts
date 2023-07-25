import type { Meta, StoryFn } from '@storybook/vue3'
import DeleteButton from './DeleteButton.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Inputs/DeleteButton',
  component: DeleteButton,
  tags: ['autodocs'],
  args: {
    onClick: action('Clicked')
  }
} as Meta<typeof DeleteButton>

const Template: StoryFn<typeof DeleteButton> = (args) => ({
  components: { DeleteButton },
  setup() {
    return { args }
  },
  template: '<DeleteButton v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {}
