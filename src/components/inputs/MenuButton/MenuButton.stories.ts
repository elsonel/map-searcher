import type { Meta, StoryFn } from '@storybook/vue3'
import MenuButton from './MenuButton.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Inputs/MenuButton',
  component: MenuButton,
  tags: ['autodocs'],
  args: {
    onClick: action('Clicked')
  }
} as Meta<typeof MenuButton>

const Template: StoryFn<typeof MenuButton> = (args) => ({
  components: { MenuButton },
  setup() {
    return { args }
  },
  template: '<MenuButton v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {}
