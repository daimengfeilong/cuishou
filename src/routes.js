/**
 * router.js-真实路由
 * routesAll.js-全量路由
 *
 * author zxl
 * 2018-08-09
 */

const routes = [
  {path: '/', redirect: '/login'},
  {
    path: '/login',
    name: 'login',
    component:(resolve) => require(['@/components/login/login.vue'], resolve),
    meta: {
      title: '登录',
      hidden: true,
    }
  },
  {
    path: '/main',
    component: (resolve) => require(['@/components/home.vue'], resolve),
    meta: {title: '主窗体'},
    children: [
      {path: '/main', redirect: 'case'},
      {
        path: 'rate',
        component: (resolve) => require(['@/components/common/blank.vue'], resolve),
        meta: {title: '费用减免'},
        children: [
          {path: '/main/rate', redirect: 'list'},
          {
            path: 'list',
            name:'rateList',
            component: (resolve) => require(['@/components/rate/list.vue'], resolve),
            meta: {title: '待录入贷款'}
          },
          {
            path: 'historyList',
            name: 'historyList',
            component: (resolve) => require(['@/components/rate/historyList.vue'], resolve),
            meta: {title: '历史减免查询'}
          }
        ]
      },
      {
        path: 'case',
        component: (resolve) => require(['@/components/common/blank.vue'], resolve),
        meta: {title: '案件处理'},
        children: [
          {path: '/main/case', redirect: 'caseList'},
          {
            path: 'queryCaseList',
            name: 'queryCaseList',
            component: (resolve) => require(['@/components/caseHandling/queryCaseList.vue'], resolve),
            meta: {title: '案件查询'}
          },
          {
            path: 'caseList',
            name: 'caseList',
            component: (resolve) => require(['@/components/caseHandling/caseList.vue'], resolve),
            meta: {title: '案件处理'}
          },
          {
            path: 'detail',
            name: 'caseDetail',
            component: (resolve) => require(['@/components/caseHandling/caseDetail.vue'], resolve),
            meta: {title: '案件详情'}
          },
          {
            path: 'handle',
            name: 'handleCase',
            component: (resolve) => require(['@/components/caseHandling/handleCase.vue'], resolve),
            meta: {title: '处理主体'}
          },
          {
            path: 'handleLog',
            name: 'handleLog',
            component: (resolve) => require(['@/components/caseHandling/handleLog.vue'], resolve),
            meta: {title: '操作日志'}
          },
          {
            path: 'buckleList',
            name:'buckleList',
            component: (resolve) => require(['@/components/caseBuckle/buckleList.vue'], resolve),
            meta: {title: '案件批扣'}
          },
          {
            path: 'outsourceCaseList',
            name:'outsourceCaseList',
            component: (resolve) => require(['@/components/caseHandling/outsourceCaseList.vue'], resolve),
            meta: {title: '委外案件查询'}
          }
        ]
      },
      {
        path: 'business',
        component: (resolve) => require(['@/components/common/blank.vue'], resolve),
        meta: {title: '业务管理'},
        children: [
          {path: '/main/business', redirect: 'ruleList'},
          {
            path: 'stageRuleList',
            name:'stageRuleList',
            component: (resolve) => require(['@/components/business/stageRuleList.vue'], resolve),
            meta: {title: '阶段规则配置'}
          },
          {
            path: 'ruleList',
            name:'ruleList',
            component: (resolve) => require(['@/components/business/ruleList.vue'], resolve),
            meta: {title: '分案规则配置'}
          },
          //{
          //  path: 'ruleDetail',
          //  name:'ruleDetail',
          //  component: (resolve) => require(['@/components/business/ruleDetail.vue'], resolve),
          //  meta: {title: '规则详情'}
          //},
          {
            path: 'settingList',
            name:'settingList',
            component: (resolve) => require(['@/components/business/settingList.vue'], resolve),
            meta: {title: '呼叫中心配置'}
          },
          {
            path: 'lostUser',
            name:'lostUser',
            component: (resolve) => require(['@/components/business/lostUser.vue'], resolve),
            meta: {title: '失联用户呼叫'}
          }
        ]
      },
      {
        path: 'system',
        component: (resolve) => require(['@/components/common/blank.vue'], resolve),
        meta: {title: '系统配置'},
        children: [
          {path: '/main/system', redirect: 'userManage'},
          {
            path: 'userManage',
            name:'userManage',
            component: (resolve) => require(['@/components/powerDeploy/user/main.vue'], resolve),
            meta: {title: '用户'}
          },
          {
            path: 'userGroup',
            name:'userGroup',
            component: (resolve) => require(['@/components/powerDeploy/userGroup/main.vue'], resolve),
            meta: {title: '用户组管理'}
          },
           {
            path: 'userSet',
            name:'userSet',
            component: (resolve) => require(['@/components/powerDeploy/userGroup/userSet.vue'], resolve),
            meta: {title: '用户管理'}
          },
          {
            path: 'permissionConfig',
            name:'permissionConfig',
            component: (resolve) => require(['@/components/powerDeploy/menu/main.vue'], resolve),
            meta: {title: '菜单管理'}
          },
          {
            path: 'roleManage',
            name:'roleManage',
            component: (resolve) => require(['@/components/powerDeploy/role/main.vue'], resolve),
            meta: {title: '角色'},
          },
          {
            path: 'memberManage',
            name:'memberManage',
            component: (resolve) => require(['@/components/powerDeploy/role/member.vue'], resolve),
            meta: {title: '成员管理'}
          },
          {
            path: 'framework',
            name:'framework',
            component: (resolve) => require(['@/components/powerDeploy/framework/main.vue'], resolve),
            meta: {title: '组织架构'}
          },
          {
            path: 'codeManage',
            name:'codeManage',
            component: (resolve) => require(['@/components/powerDeploy/codeTable/main.vue'], resolve),
            meta: {title: '码表管理'}
          }
        ]
      },
      {
        path: 'public',
        component: (resolve) => require(['@/components/common/blank.vue'], resolve),
        meta: {title: '对公登记'},
        children: [
          {path: '/main/public', redirect: 'publicRegister'},
          {
            path: 'publicRegister',
            name:'publicRegister',
            component: (resolve) => require(['@/components/publicRegister/main.vue'], resolve),
            meta: {title: '对公登记'}
          }
        ]
      }
    ]
  }
]
export default routes
