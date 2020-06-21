---
title: 使用日历订阅工大就业中心宣讲会、双选会
tags: HUT
abbrlink: ad3ad898
date: 2019-10-23 19:16:52
---
<img src="https://cdn.jsdelivr.net/gh/cxyzzz/CDN@20.06.21/images/posts/BQtMTU3vR2sScPX.webp" width="500"/>
接口均为抓包得出，理论上适用于其它也接入了此系统的学校。
<!--more-->

{% note success %}

### 2020-04-16 更新

添加多家学校支持。[学校列表](https://github.com/cxyzzz/HUT_API/blob/master/app/HUT.py#L921)

{% endnote %}

## Demo

<http://106.15.194.74:99/job.ics>

可选参数(默认为湖南工业大学校内宣讲会)
>school: 学校名称首字母缩写，eg: 湖南工业大学->hngydx
mode: `getcareers`, `getjobfairs`  
type: `inner`, `outer`  

另外支持就业中心网页的过滤条件。

eg: <http://106.15.194.74:99/job.ics?sf=宣讲会&tp=校外>

## API

带 * 号的为可选参数，请求时可不带此关键字

### 宣讲会

#### 宣讲会日程

`http://job.hut.edu.cn/module/getcareers?start=#起始点#&count=#个数#&k=#企业名称关键字#&address=#地址#&professionals=#专业#&career_type=#类型#&type=#区域#&day=#日期#`

>start: 起始点，即从第几个开始显示  
count: 从 start 开始，显示 count 个数据  
*k: 企业名称关键字，空为所有(也可使用 keyword 关键字)  
*address： 企业地址
*professionals: 专业，空为所有  
*career_type: 类型，可选值：{实习、校招、包含实习，空为全部}  
type: 范围，可选值：{校内：inner，校外：outer}  
day: 日期：eg:2019-10-23,空为当前日期  

返回 json 对象
<details>
``` json
{
    "code":状态码,
    "msg":"信息",
    "data":[{
        "overdue":"1",
        "is_yun":"0",
        "career_state":"企业状态",
        "sort_time":"170774",
        "career_talk_id":"255337",
        "company_id":"公司 ID",
        "company_name":"公司名称",
        "logo":"公司 LOGO 地址",
        "hotcount":"4",
        "professionals":"需求专业",
        "career_type":"",
        "recruit_type":"",
        "company_review":"",
        "company_property":"公司属性","industry_category":"行业类别",
        "city_name":"城市名称",
        "meet_name":"会议名称（公司名称）",
        "meet_time":"时间",
        "school_name":"",
        "address":"地点",
        "room":"",
        "view_count":"访问统计",
        "is_above_college_degree":"是否要求大学以上学历",
        "is_above_bachelor_degree":"是否要求本科以上学历",
        "is_above_master_degree":"是否要求硕士以上学历",
        "is_above_doctor_degree":"是否要求博士以上学历",
        "is_recommend":"是否推荐",
        "recommend_time":"推荐时间",
        "meet_day":"日期"
    }]
}
```
</details>

#### 企业详细信息页面

`http://static.bibibi.net/student/chance/preachmeetingdetails.html?token=yxqqnn0000000012&career_id=#企业 ID#`

>career_id: 可从前面宣讲会返回值中获取

#### 企业详细信息 API

`http://student.bibibi.net/index.php?r=career/ajaxgetcareerdetail&token=yxqqnn0000000012&career_id=#企业 ID#`

>career_id: 可从前面宣讲会返回值中获取

返回 json 对象

<details>
``` json
{
    "code":状态码,
    "msg":"信息",
    "data":{
        "company_id":公司 ID,
        "career_talk_id":293513,
        "remark":"备注(包含企业详细信息及职位详情，HTML 格式)",
        "school_name":"学校名称",
        "meet_name":"会议名称（企业名称）",
        "meet_time":"日期 时间",
        "address":"地址",
        "room":"",
        "map_lat":维度,
        "map_lng":经度,
        "map_address":"地图地址",
        "sign_up_type":0,
        "sign_up_limit":0,
        "sign_up_end_time":"",
        "career_state":0,
        "is_yun":0,
        "yun_live_url":"",
        "yun_vod_url":"",
        "view_count":访问统计,
        "book_state":"已同意",
        "for_faculty":"",
        "company_name":"公司名称",
        "is_overdue":false,
        "is_limit":false,
        "sign_up_count":0,
        "is_sign_up":false,
        "qr_code":"",
        "company":{
            "company_id":公司 ID,
            "company_name":"公司名称",
            "short_name":null,
            "keywords":null,
            "logo_url":"公司 LOGO 地址",
            "industry_category":"行业类别",
            "company_property":公司属性,
            "scale":"规模","registered_capital":null,
            "apply_url":null,
            "url":null,
            "review":null,
            "introduction":"公司介绍",
            "label":null,
            "stock_code":null,
            "mobile":null,
            "job_mobile":null,
            "tel":"电话",
            "mail":"邮箱",
            "job_mail":"工作邮箱",
            "video_url":"",
            "identification_pics":null,
            "scene_pics":null,
            "hr":null,
            "province":null,
            "city_name":"城市名称",
            "hotcount":0,
            "source":null,
            "verification_code":null,
            "send_time":null,"recent_career_talk_time":null,
            "career_talk_qty":null,
            "job_qty":null,
            "practice_qty":null,
            "invite_qr_img":null,
            "view_count":null,
            "address":"公司地址",
            "post_code":null,
            "is_yy_view":null,
            "source_school_id":null,
            "source_school":null,
            "h5_url":null,
            "company_no":null,
            "org_code":null,
            "password":null,
            "openid":null,
            "pre_company_name":null,
            "province_area":null,
            "area_name":null,
            "is_sync":null,
            "state":"状态",
            "no_pass":null,
            "approve_by":null,
            "approve_time":null,
            "create_by":null,
            "create_time":null,
            "is_disable":0,
            "modify_by":null,
            "modify_time":null,
            "m_company_id":null,
            "is_auth":null,
            "recruit_remark":null,
            "last_login_time":null,
            "last_recruit_time":null,
            "last_deduct_time":null,
            "old_company_id":null
            },
        "is_fav":0,
        "hr":{
            "nick_name":null,
            "logo_url":null},
        "docs":[],
        "practices":[],
        "jobs":[{
                "publish_id":发布 ID,
                "job_name":"岗位名称",
                "about_major":"相关专业",
                "job_number":"5",
                "city_name":"城市名称",
                "degree_require":"学历要求",
                "salary":"工资",
                "create_time":"创建时间"
            }],
        "school_id":学校 ID,
        "notice":"通知(HTML 格式)",
        "is_auth":0,
        "is_sign_in":false,
        "credit_info":{
            "credit_id":信用 ID,
            "company_id":公司 ID,
            "info_integrity_grade":"资料完整度等级",
            "info_integrity_score":资料得分,
            "recruit_liveness_grade":"招聘活跃度等级",
            "recruit_liveness_score":招聘活跃度得分,
            "income_audit_grade":"高校审核等级",
            "income_audit_cnt":高校审核,
            "complaint_cnt":0,
            "total_score":总得分,
            "ranking":0,
            "update_time":"更新时间",
            "percent_beat":100
        },
        "user_info":{
            "student_id":-1,
            "student_key":""
            },
        "bars":[],
        "moocs": 广告
}
```
</details>

#### 岗位详细信息页面

`http://static.bibibi.net/student/chance/newestjobdetails.html?token=yxqqnn0000000012&publish_id=#发布 ID#`

>publish_id: 可从前面企业详细信息 API 返回值中获取

#### 岗位详细信息 API

`http://student.bibibi.net/index.php?r=job/ajaxgetjobdetail&token=yxqqnn0000000012&publish_id=#发布 ID#`

>publish_id: 可从前面企业详细信息 API 返回值中获取

返回 json 对象
<details>
``` json
{
    "code":1,
    "msg":"",
    "data":{
        "publish_id":发布 ID,
        "job_name":"岗位名称",
        "about_major":"相关专业",
        "job_number":"5",
        "city_name":"城市名称",
        "degree_require":"学历要求",
        "salary":"工资",
        "create_time":"创建时间",
        "keywords":"关键字",
        "is_practice":0,
        "publish_hr_openid":"",
        "job_descript":"岗位介绍",
        "category":"类别",
        "welfare":"福利",
        "job_require":"",
        "view_count":访问统计,
        "job_other":"",
        "intro_apply":"简历投递方式",
        "work_address":null,
        "job_status":"岗位状态",
        "publish_time":"2019年10月14日",
        "end_time":"2020年10月21日",
        "time_type":"","amount_welfare_min":null,
        "amount_welfare_max":null,
        "source":"oper",
        "company":{
            "company_id":公司 ID,
            "company_name":"公司名称",
            "logo_url":"公司 LOGO 地址",
            "industry_category":"行业类别",
            "scale":"规模",
            "apply_url":null,
            "review":null,
            "introduction":"公司介绍",
            "job_mail":"工作邮箱",
            "video_url":"",
            "city_name":"城市名称",
            "hotcount":0,
            "address":"公司地址",
            "state":"状态",
            "is_disable":0,
            "scene_pics":null
        },
        "is_apply":0,
        "apply_cnt":"0",
        "school_list":[],
        "is_subscribe":0,
        "credit_info":{
            "credit_id":信用 ID,
            "company_id":公司 ID,
            "info_integrity_grade":"资料完整度等级",
            "info_integrity_score":资料得分,
            "recruit_liveness_grade":"招聘活跃度等级",
            "recruit_liveness_score":招聘活跃度得分,
            "income_audit_grade":"高校审核等级",
            "income_audit_cnt":高校审核,
            "complaint_cnt":0,
            "total_score":总得分,
            "ranking":0,
            "update_time":"更新时间",
            "percent_beat":100
        },
    "user_info":{
        "student_key":""
        },
    "moocs":广告,
    "is_fav":0
    }
}
```
</details>

#### 企业信用信息页面

`http://static.bibibi.net/student/chance/company_credit.html?token=yxqqnn0000000012&company_id=#公司 ID#`

>company_id: 可从前面企业详细信息 API 返回值中获取

#### 企业信用信息 API

`http://student.bibibi.net/index.php?r=complaint/ajax_company_complaint_info&token=yxqqnn0000000012&company_id=#公司 ID#`

>company_id: 可从前面企业详细信息 API 返回值中获取

### 双选会

#### 双选会日程

`http://job.hut.edu.cn/module/getjobfairs?start=#起始点#&count=#个数#&type=#区域#&address=#地址#&organisers=#主办方#&keyword=#企业名称关键字#&day=#日期#`

>start: 同宣讲会  
count: 同宣讲会  
*type: 同宣讲会  
*address: 同宣讲会  
*organisers: 组织者
*keyword: 企业名称关键字，空为所有(也可使用 k 关键字)  
*day: 范围，默认为校内，任意值为校外

返回 json 对象

<details>
``` json
{
    "code":状态码,
    "msg":"信息",
    "data":[{
        "overdue":"1",
        "sort_time":"53005",
        "fair_id":"4126",
        "inner_school":"0",
        "type":"0",
        "is_online":"0",
        "title":"标题",
        "organisers":"组织者",
        "school_name":"学校名称",
        "address":"地址",
        "fact_c_count":"283",
        "plan_c_count":"500",
        "view_count":"访问统计",
        "meet_time":"时间",
        "is_recommend":"是否推荐",
        "recommend_time":"推荐时间",
        "is_inner":"0",
        "is_over":false,
        "meet_day":"日期",
        "school_cnt":"181",
        "internet_cnt":"78",
        "total":259
    }]
}
```
</details>

#### 双选会详细信息页面

`http://job.hut.edu.cn/detail/jobfair?id=#ID#`

>id: 可从前面返回值中 fair_id 获取

#### 双选会详细信息 API

`https://s.bysjy.com.cn/index.php?r=chance/ajaxgetjobfairdetail&token=yxqqnn0000000012&fair_id=`

>fair_id: 可从前面返回值中获取

返回 json 对象

<details>
``` json
{
    "code":状态码,
    "msg":"信息",
    "data":{
        "fair_id":双选会 ID,
        "school_id":学校 ID,
        "type":0,
        "title":"标题",
        "organisers":"组织者",
        "school_name":"学校名称",
        "is_outer":0,
        "is_show_company":1,
        "is_online":0,
        "address":"地址",
        "content":"内容(HTML 格式)",
        "scene_pics":"",
        "professionals":"","recruit_notices":"通知(HTML 格式)",
        "company_signup_type":"招聘信息报名",
        "map_address":"",
        "map_lat":0,
        "map_lng":0,
        "is_need_ticket":0,
        "is_need_deposit":0,
        "view_count":访问统计,
        "meet_time":"时间",
        "is_overdue":false,
        "ticket":null,
        "is_fav":0,
        "docs":[],
        "companies":[],
        "is_auth":0,
        "job_list":[],
        "is_arbeitsagentur_jobfair":0
    }
}
```
</details>

## 效果图

![IMG_20191023_220926.jpg](https://i.loli.net/2019/10/23/YEznJiaecbr4PTV.jpg)