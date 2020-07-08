---
title: 湖南工业大学电费查询
tags: HUT
abbrlink: 328206c9
date: 2019-09-22 21:09:43
---
<img src="https://cdn.jsdelivr.net/gh/cxyzzz/CDN@20.07.08/images/posts/tDgNBEq7ZkGxnc5.webp" width="500" >
接口均为从完美校园抓包得出，理论上适用于其它也接入了完美校园的学校。
<!-- more -->
## Demo

<http://106.15.194.74:99/df?xq=河西&ld=25&qs=117>  
xq：校区，可选值为 `河东`、`河西`  
ld：楼栋  
qs：寝室号

## getJzinfo

`http://h5cloud.17wanxiao.com:8080/CloudPayment/user/getRoom.do?payProId=#支付订单ID#&schoolcode=#学校代码#&optype=#状态码#&areaid=#校区ID#&buildid=#楼栋ID#&unitid=#单元ID#&levelid=#等级ID#&businesstype=#业务类型#`

以下查询中不变的值：
`payProId` 随机生成一个大于1000的整数即可
`schoolcode` 为学校代码，请自行查询
`businesstype=2`

### 获取校区信息

>optype=1  
arieaid=0  
buildid=0  
unitid=0  
levelid=0  

### 获取楼栋信息

>optype=2  
areaid=#从前面获取到的校区信息中查找#  
buildid=0  
unitid=0  
levelid=0  

### 获取寝室信息

>optype=4  
areaid=#从前面获取到的校区信息中查找#  
buildid=#从前面获取到的楼栋信息中查找#  
unitid=0  
levelid=-1  

## 查询电费

`http://h5cloud.17wanxiao.com:8080/CloudPayment/user/getRoomState.do?payProId=#订单ID#&schoolcode=#学校ID#&businesstype=#业务类型#&roomverify=#寝室编号#`

>payProId 随机生成一个整数即可  
schoolcode 为学校代码，请自行查询  
businesstype=2  
roomverify #从前面获取到的寝室信息中查找#
