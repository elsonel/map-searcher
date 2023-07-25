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
    onInput: action('Input changed')
  }
} as Meta<TableRowArgs>

const Template: StoryFn<TableRowArgs> = (args) => ({
  components: { TableRow },
  setup() {
    return { args }
  },
  template: `
    <TableRow v-bind="args">
      <div v-html="args.slotTemplate"/>
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
