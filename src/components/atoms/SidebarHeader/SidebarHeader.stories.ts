import type { Meta, StoryFn } from '@storybook/vue3'
import SidebarHeader from './SidebarHeader.vue'

interface SidebarHeaderArgs {
  slotTemplate: string // only for Storybook
}

export default {
  title: 'Atoms/SidebarHeader',
  component: SidebarHeader,
  tags: ['autodocs'],
  args: {
    slotTemplate: 'Sidebar Header Text'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
} as Meta<SidebarHeaderArgs>

const Template: StoryFn<SidebarHeaderArgs> = (args) => ({
  components: { SidebarHeader },
  setup() {
    return { args }
  },
  template: `
    <SidebarHeader v-bind="args" @onCheckboxClick="args.onCheckboxClick">
      <span v-html="args.slotTemplate"/>
    </SidebarHeader>`
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
