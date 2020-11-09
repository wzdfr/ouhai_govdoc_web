import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import docMain from '@/views/docblocks/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // {
    //   path: '/doc/blocks2',
    //   name: 'HelloWorld',
    //   component:  resolve => {
    //     require(['@/views/docblocks/index2.vue'], resolve)
    //   }
    // },
    {
      path: '/doc/blocks3',
      name: 'HelloWorld3',
      component:  resolve => {
        require(['@/views/docblocks/index3.vue'], resolve)
      }
    },{
      path: '/doc/blocks4',
      name: 'HelloWorld4',
      component:  resolve => {
        require(['@/views/docblocks/index4.vue'], resolve)
      }
    },
    {
      path: '/doc/blocks',
      name: '公文积木',
      component: docMain,
      children: [
        {
          path: 'add',
          name: 'tianjia',
          component: resolve => {
            require(['@/views/docblocks/add.vue'], resolve)
          }
        }
      ]

    }
  ]
})
