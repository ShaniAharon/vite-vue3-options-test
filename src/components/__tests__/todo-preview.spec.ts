import {describe, it, expect} from 'vitest'

import {mount} from '@vue/test-utils'
import todoPreview from '../todo-preview.vue'

describe('todoApp', () => {
  it('renders properly', () => {
    const wrapper = mount(todoPreview, {props: {msg: 'Hello Vitest'}})
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
