import type { Meta, StoryFn } from '@storybook/vue3'
import NavigationButton from './NavigationButton.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Inputs/NavigationButton',
  component: NavigationButton,
  tags: ['autodocs'],
  args: {
    onClick: action('Clicked')
  }
} as Meta<typeof NavigationButton>

const Template: StoryFn<typeof NavigationButton> = (args) => ({
  components: { NavigationButton },
  setup() {
    return { args }
  },
  template: '<NavigationButton v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {}
