---
title: 使用 mentohust 代替锐捷进行校园网认证
tags: 锐捷
categories:
  - 路由器
abbrlink: 2443be7d
date: 2018-06-21 20:07:41
---
使用 [Mentohust](https://baike.baidu.com/item/mentohust/11049624) 代替锐捷进行认证。mentohust 有多个平台，此处只讲在路由器上使用。大多数第三方固件均已集成了 Mentohust，如果没有集成的话可自行安装。不想用第三方固件或者不会刷固件可以购买极路由，官方自带锐捷认证。
使用 mentohust 需要安装三个软件包，libpcap.ipk、luci-app-mentohust.ipk、mentohust.ipk。其中 luci-app-mentohust.ipk 为 web 管理，可不安装。mentohust.ipk 包也可直接使用 mentohust 二进制包使用命令行运行。软件包需要对应路由器 cpu 架构，此处不提供文件，需自行解决，若实在找不到可在评论留言，我有时间会帮忙编译。

部分项目地址：

- [mentohust 加入 v4 支持](https://github.com/hyrathb/mentohust)
- [com.ptpt52.openwrt](https://github.com/ptpt52/com.ptpt52.openwrt) 含 luci-app-mentohust，mentohust-proxy

mentohust 所有参数可在终端输入 `mentohust -h` 查看，输入后显示以下内容：

![mentohust](https://i.loli.net/2019/06/08/5cfb5bfcbe79f16881.jpg)

或者直接在 webui 填写 （此为本人所有参数仅供参考）：

![mentohust](https://i.loli.net/2019/06/08/5cfb5c28f089313758.jpg)
其中 用户名填：`学号@运营商` 移动宽带则为移动，电信填电信，联通可直接使用学号。密码为 `宽带密码即使用锐捷客户端认证时的密码`,网卡选择 WAN 口网卡（可在 web 界面 网络-接口 查看。其他参数按照上图填写即可。

 也可使用 [minieap](https://github.com/updateing/minieap) 进行锐捷认证。我没用过这个，故不作太多介绍。