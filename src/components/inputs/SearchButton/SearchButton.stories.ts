import type { Meta, StoryFn } from '@storybook/vue3'
import SearchButton from './SearchButton.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Inputs/SearchButton',
  component: SearchButton,
  tags: ['autodocs'],
  args: {
    onClick: action('Clicked')
  }
} as Meta<typeof SearchButton>

const Template: StoryFn<typeof SearchButton> = (args) => ({
  components: { SearchButton },
  setup() {
    return { args }
  },
  template: '<SearchButton v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {}
