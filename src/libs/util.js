import axios from 'axios';
// import env from '../../build/env';
// import semver from 'semver';
// import packjson from '../../package.json';
// import store from '../store';
import qs from 'qs';

let util = {};

util.isdev = true;

util.title = function (title) {
    title = title || 'APP name';
    window.document.title = title;
};

/* const ajaxUrl = env === 'development'
    ? 'http://127.0.0.1:8020'
    : env === 'production'
    ? 'https://www.url.com'
    : 'https://debug.url.com'; */
const ajaxUrl = '/';

// 全局默认
// axios.defaults.headers.common['token'] = store.state.user.token;
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 300000
    // withCredentials:true//跨域
});

util.ajax2 = axios.create({
    baseURL: ajaxUrl,
    timeout: 300000
    // withCredentials:true//跨域
});

util.downAjax = axios.create({
    responseType: 'blob'
    /* headers:{
        'Content-Type':'application/json'
    } */
});

// 请求拦截器
util.downAjax.interceptors.request.use(
    config => {
        // if (store.getters.token) { // 判断是否存在token，如果存在的话加上
        //     config.headers.token = store.state.user.token;
        // }

        // 修改请求方式
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        config.data = qs.stringify(config.data);

        return config;
    },
    err => {
        return Promise.reject(err);
    });

// 请求拦截器
util.ajax2.interceptors.request.use(
    config => {
        // if (store.getters.token) { // 判断是否存在token，如果存在的话加上
        //     config.headers.token = store.state.user.token;
        // }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// 请求拦截器
util.ajax.interceptors.request.use(
    config => {
        if (store.getters.token) { // 判断是否存在token，如果存在的话加上
            config.headers.token = store.state.user.token;
        }

        // 修改请求方式
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        config.data = qs.stringify(config.data);

        return config;
    },
    err => {
        return Promise.reject(err);
    });

util.logout = function () {
    store.commit('logout');
    store.commit('appLogout');
    location.href = '/#/login';
    location.reload();
};

// 添加响应拦截器
util.ajax.interceptors.response.use(function (response) {
    if (response.data && response.data.code == -1) {
        // 未登录
        // alert('您的登录状态已失效，或已从另一地点登录');
        util.logout();
    } else {
        return response;
    }
}, function (error) {
    return Promise.reject(error);
});

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.map(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && itAccess.isArray()) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    let routerObj;
    routers.forEach(item => {
        if (item.name === 'otherRouter') {
            item.children.forEach((child, i) => {
                if (child.name === name) {
                    routerObj = item.children[i];
                }
            });
        } else if (item.children !== undefined) {
            if (item.children.length === 1) {
                if (item.children[0].name === name) {
                    routerObj = item.children[0];
                }
            } else {
                item.children.forEach((child, i) => {
                    if (child.name === name) {
                        routerObj = item.children[i];
                    }
                });
            }
        } else {
            if (item.name === name) {
                routerObj = item;
            }
        }
    });
    return routerObj;
};

util.handleTitle = function (vm, item) {
    return item.title;
};


util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
};

// 日期格式化
Date.prototype.Format = function (fmt) {
    var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))); }
    return fmt || null;
};

/**
 * 今年的第几周
 * @param dateString
 * @returns {*}
 */
util.getYearWeek = function (dateString) {
    var da = dateString;// 日期格式2015-12-30
    // 当前日期
    var date1 = new Date(da.substring(0, 4), parseInt(da.substring(5, 7)) - 1, da.substring(8, 10));
    // 1月1号
    var date2 = new Date(da.substring(0, 4), 0, 1);
    // 获取1月1号星期（以周一为第一天，0周一~6周日）
    var dateWeekNum = date2.getDay() - 1;
    if (dateWeekNum < 0) { dateWeekNum = 6; }
    if (dateWeekNum < 4) {
        // 前移日期
        date2.setDate(date2.getDate() - dateWeekNum);
    } else {
        // 后移日期
        date2.setDate(date2.getDate() + 7 - dateWeekNum);
    }
    var d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
    if (d < 0) {
        var date3 = (date1.getFullYear() - 1) + '-12-31';
        return getYearWeek(date3);
    } else {
        // 得到年数周数
        var year = date1.getFullYear();
        var week = Math.ceil((d + 1) / 7);
        return week;
    }
};

/**
            目;录树
 * @param items 目录树，JSON对象
 * @param nameField 代表名称字段的字段名称
  *                 am childFie ld 代表子类数组的字段名称
 * @para            ey 查询关键字
 * @returns {*} 返回查询后的结果树，把原来的树替换掉就可以
 */
util.searchTree = function (items, nameField, childField, key) {
    // 相当于克隆了一个对象
    const resultTemp = JSON.parse(JSON.stringify(items));
    const reg = RegExp('.*?' + key, 'gi');
    util.forEachChild(resultTemp, reg, nameField, childField);
    return resultTemp;
};

/**
 * 递归目录树子类查询
 * @param items JSON对象
 * @param reg   正则对象
 * @param nameField 代表名称字段的字段名称
 * @param childField 代表子类数组的字段名称
 * @returns {boolean}   true就是找到了
 */
util.forEachChild = function (items, reg, nameField, childField) {
    var subsTem = [], childItems;
    items[childField].forEach(function (child) {
        childItems = child[childField];
        // 设置从开头匹配
        reg.lastIndex = 0;
        if (reg.test(child[nameField])) {
            // 还是要递归一下它的子类
            if (childItems != undefined && childItems.length > 0) {
                util.forEachChild(child, reg, nameField, childField);
            }
            subsTem.push(child);
        } else if (childItems != undefined && childItems.length > 0 && util.forEachChild(child, reg, nameField, childField).length > 0) {
            // 当前不匹配，但是子类匹配到了，也保留
            subsTem.push(child);
        }
    });
    items[childField] = subsTem;
    return subsTem;
};

/**
 * json转成Iview Tree
 * @param json
 * @param selectId 选中的Id
 */
util.jsonToTree = function (json, firstTitle) {
    var treeData = {
        title: firstTitle || '后台资源',
        id: 0,
        expand: true,
        children: []
    };
    json.forEach(function (item) {
        if (!item.parentId) {
            treeData.children.push({
                title: item.name || item.title || item.tit,
                expand: false,
                id: item.id,
                parentId: 0
            });
        }
    });
    setTreeChild(treeData.children, json);
    return [treeData];
};

/**
 * 递归json转成Tree
 * @param treeChild
 * @param datas
 * @param selectId 要被选中的ID
 */
function setTreeChild (treeChild, datas) {
    treeChild.forEach(function (item) {
        datas.forEach(function (data) {
            if (data.parentId == item.id) {
                if (item.children == undefined) {
                    item.children = [];
                }
                item.children.push({
                    title: data.name || data.title || data.tit,
                    expand: false,
                    id: data.id,
                    parentId: data.parentId || 0
                });
            }
        });
        if (item.children != undefined && item.children.length > 0) {
            setTreeChild(item.children, datas);
        }
    });
}

/**
 * 遍历Tree勾选,禁用等操作
 * @param treeData
 * @param arr 勾选的ID数组
 * @returns {*}
 */
util.doEachTree = function (treeData, arr, isChecked, isDisable) {
    treeData.forEach(function (item) {
        arr.forEach(function (obj) {
            if (obj.id == item.id || obj == item.id) {
                if (isChecked) {
                    item.checked = true;
                }
                if (isDisable) {
                    item.disabled = true;
                }
            }
        });
        if (!item.checked && item.children != undefined && item.children.length > 0) {
            util.doEachTree(item.children, arr, isChecked, isDisable);
        }
    });
    return treeData;
};

/**
 * 遍历树
 * @param treeData 数组
 * @param 名称
 */
util.MenudoEachTree = function (treeData, toname) {
    let res = false;
    treeData.forEach(function (item) {
        if (res) {

        } else {
            res = item.name == toname;
            if (!res && item.children != undefined && item.children.length > 0) {
                res = util.MenudoEachTree(item.children, toname);
            }
        }
    });
    return res;
};

/**
 * 数据字典
 * @param dicCode 字典代码
 * @returns {*|AxiosPromise}
 */
util.dic = function (dicCode) {
    return util.ajax.post('/api/v1/dictitem/items?code=' + dicCode);
};


util.editor_fullscreen_init = function (editor) {
  // alert(editor.id)
  // alert(editor.$toolbarElem[0])
  // alert(editor.toolbarElemId)
  $('.w-e-toolbar').append('<div class="w-e-menu"><a class="_wangEditor_btn_fullscreen" href="javascript:void(0)" onclick="this.editor_toggleFullscreen(\'' + editor + '\')">全屏</a></div>');
}

util.editor_toggleFullscreen = function (editor) {
  $("#editor").toggleClass('fullscreen-editor')
  if ($('#editor ._wangEditor_btn_fullscreen').text() == '全屏') {
    $( '#editor ._wangEditor_btn_fullscreen').text('退出全屏')
  } else {
    $( '#editor ._wangEditor_btn_fullscreen').text('全屏')
  }
}
util.hasClass=function(elem,cls){
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}
util.addClass=function(elem,cls){
  if (!util.hasClass(elem, cls)) {
    elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
  }
}

util.removeClass=function(elem,cls){
  if (util.hasClass(elem, cls)) {
    let newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

export default util;
