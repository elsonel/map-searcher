import type { Meta, StoryFn } from '@storybook/vue3'
import TableRow from './TableRow.vue'
import { action } from '@storybook/addon-actions'

interface TableRowArgs {
  slotTemplate: string // only for Storybook
  isInitialChecked: boolean
  onInput: () => void
}

export default {
  title: 'Inputs/TableRow',
  component: TableRow,
  tags: ['autodocs'],
  args: {
    slotTemplate: 'Location Name Here',
    isInitialChecked: false,
    onCheckboxClick: action('Input changed'),
    onClick: action('Clicked')
  }
} as Meta<TableRowArgs>

const Template: StoryFn<TableRowArgs> = (args) => ({
  components: { TableRow },
  setup() {
    return { args }
  },
  template: `
    <TableRow v-bind="args" @onCheckboxClick="args.onCheckboxClick">
      <span v-html="args.slotTemplate"/>
    </TableRow>`
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
