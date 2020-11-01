import { shallowMount, createLocalVue } from '@vue/test-utils'
import ItemCart from '@/components/ItemCart.vue'
import Vuex from 'vuex'

describe('Foo', () => {
  it('props', () => {
    const wrapper = shallowMount(ItemCart, {
      methods: {
        incrementValue: () => {
          return 2
        },
        decrementValue: () => {
          return 1
        },
      },
      propsData: {
        cartItem: {
          uuid: '0006b1ac-',
          discount: 0,
          description: 'Live every city like a local with Musement',
          title: 'Barcelona City Tour',
          coverImageUrl: 'https://images.musement.com/cover/',
          retailPrice: 10,
          isFavorites: false,
          quantity: 1,
        },
        index: 0,
      },
    })

    expect(wrapper.find('div').element.tagName).toBe('DIV')
    expect(wrapper.attributes().id).toBe('0')
    expect(wrapper.props().cartItem.uuid).toBe('0006b1ac-')
    expect(wrapper.props().cartItem.title).toBe('Barcelona City Tour')
    expect(wrapper.props().cartItem.description).toBe(
      'Live every city like a local with Musement'
    )
    expect(wrapper.props().cartItem.discount).toBe(0)
    expect(wrapper.props().cartItem.retailPrice).toBe(10)
    expect(wrapper.props().cartItem.coverImageUrl).toBe(
      'https://images.musement.com/cover/'
    )
    expect(wrapper.props().index).toBe(0)
    const button = wrapper.find('button')
    wrapper.vm.$props.cartItem.quantity = 1
    button.trigger('click')
    expect(wrapper.vm.$props.cartItem.quantity).toBeGreaterThan(0)
  })
  const localVue = createLocalVue()

  localVue.use(Vuex)
  describe('Actions.vue', () => {

    let actions
    let store

    beforeEach(() => {
      actions = {
        updateCart: jest.fn(),
        addToCart: jest.fn()
      }
      store = new Vuex.Store({
        actions,
      })
    })
    it('calls store action "actionClick" when button is clicked', () => {

      const wrapper = shallowMount(ItemCart, {
        propsData: {
          cartItem: {
            uuid: '0006b1ac-',
            discount: 0,
            description: 'Live every city like a local with Musement',
            title: 'Barcelona City Tour',
            coverImageUrl: 'https://images.musement.com/cover/',
            retailPrice: 10,
            isFavorites: false,
            quantity: 1,
          },
          index: 0,
        },
        store, localVue
      })
      console.log(wrapper)
    })
  })
})
