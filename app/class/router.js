/**
 * 封装路由
 *
 * by luoage@msn.cn
 */

import Router from 'koa-router';

class router {
	constructor() {
		this.router = new Router();
	}

	/**
	 * 定义url前缀和作用域, 具体属性参考koa-router constructor
	 *
	 * @param {object} attribute 参数
	 * @param {function} cb 主方法
	 * @param {...args} args 认证或者中间件
	 *
	 * @return void
	 */
	group(attribute, cb, ...args) {
		attribute = attribute || {};

		var namespace = attribute.namespace || '';

		namespace && (delete attribute.namespace);

		var router = new Router(attribute);

		cb && cb(router);

		this.router.use(namespace, ...args, router.routes(), router.allowedMethods());
	}
};

module.exports = router;
