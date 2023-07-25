import type { Meta, StoryFn } from '@storybook/vue3'
import MapMarker from './MapMarker.vue'

export default {
  title: 'Atoms/MapMarker',
  component: MapMarker,
  tags: ['autodocs'],
  args: {}
} as Meta<typeof MapMarker>

const Template: StoryFn<typeof MapMarker> = (args) => ({
  components: { MapMarker },
  setup() {
    return { args }
  },
  template: '<MapMarker v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {}
