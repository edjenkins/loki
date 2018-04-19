import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'

import Dashboard from '@/components/Dashboard'

import Messages from '@/components/Messages'
import MessageWelcome from '@/components/messages/MessageWelcome'
import MessageComposer from '@/components/messages/MessageComposer'

import Subscribers from '@/components/Subscribers'

import Groups from '@/components/Groups'

import Subscribe from '@/components/Subscribe'

// import { requireAuth, notAuthenticated } from '@/utils/auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/subscribe',
      name: 'subscribe',
      component: Subscribe
    },
    {
      path: '/dashboard/:group?',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/messages',
      component: Messages,
      children: [
        {
          name: 'messages',
          path: '/',
          component: MessageWelcome
        },
        {
          name: 'compose',
          path: 'compose',
          component: MessageComposer
        },
        {
          name: 'message',
          path: ':id?',
          component: MessageComposer
        }
      ]
    },
    {
      path: '/subscribers/:id?',
      name: 'subscribers',
      component: Subscribers
    },
    {
      path: '/groups/:id?',
      name: 'groups',
      component: Groups
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '*',
      redirect: '/dashboard'
    }
  ]
})
