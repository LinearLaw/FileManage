import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Files/Files.vue';
import ViewPic from '@/views/ViewPic/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'Index',
        component: Index,
        children:[
          
        ]
    },
    {
      path: '/view',
      name: 'ViewPic',
      component: ViewPic,
    }
  ]
})
