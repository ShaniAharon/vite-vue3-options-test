import {describe, it, expect} from 'vitest'

import {mount} from '@vue/test-utils'
import todoApp from '../../views/todo-app.vue'

describe('todoApp', () => {
  it('renders properly', () => {
    const wrapper = mount(todoApp, {props: {msg: 'Hello Vitest'}})
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
