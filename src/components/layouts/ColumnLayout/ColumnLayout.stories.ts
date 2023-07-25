import type { Meta, StoryFn } from '@storybook/vue3'
import ColumnLayout from './ColumnLayout.vue'

interface ColumnLayoutArgs {
  slotTemplate: string // only for Storybook
}

export default {
  title: 'Layouts/ColumnLayout',
  component: ColumnLayout,
  tags: ['autodocs'],
  args: {
    slotTemplate: `
        <div>Location 1 Name Here</div>
        <div>Location 2 Name Here</div>
        <div>Location 3 Name Here</div>
        <div>Location 4 Name Here</div>
    `
  }
} as Meta<ColumnLayoutArgs>

const Template: StoryFn<ColumnLayoutArgs> = (args) => ({
  components: { ColumnLayout },
  setup() {
    return { args }
  },
  template: `
    <ColumnLayout v-bind="args">
      <div v-html="args.slotTemplate"/>
    </ColumnLayout>`
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
