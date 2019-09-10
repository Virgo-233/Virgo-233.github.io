---
title: HUT_QZAPI
date: 2019-09-09 22:57:55
tags:
---

HUT 强智教务系统 API

地址<https://github.com/cxyzzz/HUT_QIANZHI_API>
参考<https://github.com/TLingC/QZAPI>

## API列表

### authUser

登录帐号  
`http://218.75.197.123:83/app.do?method=authUser&xh=学号&pwd=密码`

**返回值**  
返回 JSON 对象

``` json
{
    'success': 登录状态,
    'token': 'Token',
    'user':{
        'scsj': 未知,
        'sjyzm': 未知,
        'useraccount': '登录用户',
        'usertype': '用户类型，学生为 2',
        'userdwmc': '学院',
        'username': '用户姓名',
        'userpasswd': '用户密码'
        },
    'userdwmc': '学院',
    'userrealname': '用户姓名',
    'usertype': '用户类型，学生为 2'

}
```

之后的查询均需携带 Token

### getStudentIdInfo

~~获取学号信息(已禁止查询)  
`http://218.75.197.123:83/app.do?method=getStudentIdInfo&xh=#学号#`~~

**返回值**  
返回 JSON 对象

``` json
{
    'bjid'：'未知',
    'ndzyid'：'未知',
    'yxid'：'未知',
    'xxdm'：'未知'
}
```

### getCurrentTime

获取当前时间、周次、学年等信息  
`http://218.75.197.123:83/app.do?method=getCurrentTime&currDate=#查询日期#`

**返回值**  
返回 JSON 对象

``` json
{
    'e_time': '周结束时间',
    's_time': '周开始时间',
    'xnxqh': '学年',
    'zc': '周次'
}
```

### getKbcxAzc

获取课程表  
`http://218.75.197.123:83/app.do?method=getKbcxAzc&xh=#学号#&xnxqid=#学年#&zc=#周次#`

**返回值**  
返回JSON数组

``` json
[
    {
        'jsmc': '教室名称',
        'jssj': '下课时间',
        'jsxm': '教师姓名',
        'kcmc': '课程名称',
        'kkzc': '课程教学周',
        'kcsj': '课程时间（eg: 50304 表示星期五第3-4节）',
        'kssj': '上课时间',
        'sjbz': '未知'
    }
]
```

### getXqcx

获取校区  
`http://218.75.197.123:83/app.do?method=getXqcx`

**返回值**  
返回JSON数组

``` json
[
    {
        'xqid': '1',
        'xqmc': '河东校区'
    },
    {
        'xqid': '2',
        'xqmc': '河西校区'
    }
]
```

### getJxlcx

获取校区教学楼信息  
`http://218.75.197.123:83/app.do?method=getJxlcx&xqid=#校区ID#`

**返回值**  
返回JSON数组

``` json
[
    {
        'jzwid': '教学楼 ID',
        'jzwmc': '教学楼名称'
    }
]
```

### getKxJscx

获取空教室  
`http://218.75.197.123:83/app.do?method=getKxJscx&time=#查询日期#&idleTime=#见下方说明#&xqid=#校区ID#&jxlid=#教学楼ID#&classroomNumber=_#可容纳人数，见下方说明#`

xqid(校区 ID)、jxlid(教学楼 ID)、classroomNumber(教室容纳人数)是可选参数

**idleTime取值**  
> allday：全天  
am：上午  
pm：下午  
night：晚上

**classroomNumber**  
> 30：30人以下  
30-40：30-40人  
40-50：40-50人  
60：60人以上

**返回值**  
返回JSON数组

``` json
{
    'data': [
        {
            'jsList': [
                {
                    'jsh': '未知',
                    'jsid': '教室 ID',
                    'jsmc': '教室名称',
                    'jzwid': '所在楼ID',
                    'jzwmc': '教学楼名称',
                    'xqmc': '校区名称',
                    'yxzws': 教室容量,
                    'zws': 未知，和yxzws相同
                }
            ],
            'jxl': '教学楼'
        }
    ],
    'success': 状态,
    'xnxqid': '学年'
}
```

### getUserInfo

获取帐号信息  
`http://218.75.197.123:83/app.do?method=getUserInfo&xh=#学号#`

**返回值**  
返回 JSON 对象

``` json
{
    'bj': '班级',
    'dh': '电话',
    'dqszj': '未知，与入学年份、年级相同',
    'email': '电子邮箱',
    'fxzy': '辅修专业',
    'ksh': '高考考号',
    'nj': '年级',
    'qq': 'QQ 号',
    'rxnf': '入学年份',
    'usertype': '用户类别，学生为 2',
    'xb': '性别',
    'xh': '学号',
    'xm': '姓名',
    'xz': 未知,
    'yxmc'：'院系名称',
    'zymc'：'专业名称'
    }
```

### getXnxq

获取学年和学期信息  
`http://218.75.197.123:83/app.do?method=getXnxq&xh=#学号#`

**返回值**  
返回JSON数组

``` json
[
    {
        'isdqxq': '是否为当前学期，1 为是，0 为否',
        'xnxq01id': '学年id',
        'xqmc': '学年名称'
    }
]
```

### getCjcx

获取成绩信息  
`http://218.75.197.123:83/app.do?method=getCjcx&xh=#学号#&xnxqid=#学期学年ID#`

**返回值**  
返回 JSON 数组

``` json
{
    'result': [
        {
            'bz': 未知,
            'cjbsmc': 未知,
            'kclbmc': '课程类别名称',
            'kcmc': '课程名称',
            'kcxzmc': '课程性质名称',
            'kcywmc': 未知,
            'ksxzmc': '考试性质名称',
            'xf': 学分,
            'xm': '姓名',
            'xqmc': '学期名称',
            'zcj': '总成绩'
        }
    ]，
    'success': 状态
}
```

### getKscx

获取考试信息  
`http://218.75.197.123:83/app.do?method=getKscx&xh=#学号#`

**返回值**  
条件所限，尚未明晰

### getEarlyWarnInfo

获取学籍预警信息  
`http://218.75.197.123:83/app.do?method=getEarlyWarnInfo&xh=#学号#&history=#见下方说明#`

**history取值**  
> 0：当前预警  
1：历史预警

**返回值**  
条件所限，尚未明晰

## 示例

1. 支持导出课表为 ics 日历文件

2. WEB 展示(不会前端，使用博客为模板写了课表展示，暂未完善)
