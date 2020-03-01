import Vue from 'vue'
import Router from 'vue-router'
Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

const noNeedHandPhotoAuthentication = (resolve) => {
  import('@common/components/noNeedHandPhotoAuthentication/index').then((module) => {
    resolve(module)
  })
}; //审核成功

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  // 推荐状态流程
  routes: [
    {
      path: '/',
      redirect: '/apply-flow'
    },
    {
      path: '/apply-flow',
      name: 'applyFlow',
      component: (resolve) => {
        import('@/pages/applyFlow').then((module) => {
          resolve(module)
        })
      },
      meta: {
        title: '申请流程',
        index: 1
      }
    },
    // 未进入排队
    {
      path: '/un-queuing',
      name: 'unQueuing',
      component: (resolve) => {
        import('@/pages/unQueuing').then((module) => {
          resolve(module)
        })
      },
      meta: {
        title: '等待排队',
        index: 1
      }
    },
    // 排队
    {
      path: '/queuing',
      name: 'queuing',
      component: (resolve) => {
        import('@/pages/queuing').then((module) => {
          resolve(module)
        })
      },
      meta: {
        title: '排队',
        index: 1
      }
    },
    // 填写申请
    {
      path: '/loan-application',
      name: 'loanApplication',
      component: (resolve) => {
        import('@/pages/loanApplication').then((module) => {
          resolve(module)
        })
      },
      meta: {
        title: '借款申请',
        index: 1
      }
    },
    // 提交成功
    {
      path: '/submit-success',
      name: 'submitSuccess',
      component: (resolve) => {
        import('@/pages/submitSuccess').then((module) => {
          resolve(module)
        })
      },
      meta: {
        title: '提交成功',
        index: 1
      }
    },
    // 审核成功
    {
      path: '/audit-success',
      name: 'auditSuccess',
      component: (resolve) => {
        import('@/pages/auditSuccess').then((module) => {
          resolve(module)
        })
      },
      meta: {
        title: '审核成功',
        index: 1
      }
    },
    // 审核失败
    {
      path: '/audit-fail',
      name: 'auditFail',
      component: (resolve) => {
        import('@/pages/auditFail').then((module) => {
          resolve(module)
        })
      },
      meta: {
        title: '审核失败',
        index: 1
      }
    },
    // 提现
    {
      path: '/cash',
      name: 'cash',
      component: (resolve) => {
        import('@/pages/cash').then((module) => {
          resolve(module)
        })
      },
      meta: {
        title: '审核失败',
        index: 1
      }
    },
    // 添加银行卡
    {
      path: '/add-bank-card',
      name: 'addBankCard',
      component: (resolve) => {
        import('@/pages/addBankCard').then((module) => {
          resolve(module)
        })
      },
      meta: {
        title: '借款申请',
        index: 1
      }
    },
    {
      path: '/error',
      name: 'error',
      component: (resolve) => {
        import('@/pages/error/index').then((module) => {
          resolve(module)
        })
      },
      meta: {
        title: '暂无数据',
        index: 1
      }
    },
    {
      path: '/identity-authentication',
      name: 'identityAuthentication',
      component: (resolve) => {
        import('@common/components/identityAuthentication/index').then((module) => {
          resolve(module)
        })
      },
      meta: {
        title: '身份认证',
        index: 1
      }
    },
    {
      path: '/test2',
      name: 'noNeedHandPhotoAuthentication',
      component: noNeedHandPhotoAuthentication,
      meta: {
        title: '审核失败',
        index: 1
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
