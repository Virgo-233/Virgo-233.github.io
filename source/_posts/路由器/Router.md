---
title: 路由器
author: Chen
tags: 
categories: 
abbrlink: 5799c0b3
date: 2018-06-21 12:20:00
---
此为本人用过的路由器部分资源，写出来方便以后需要。
<!-- more -->

## 斐讯 k2t

官方/官改固件锁定了 u-boot 分区，所以无法在官方/官改固件下刷入 breed，如若确实想用官改，建议先刷入 breed 后再刷回官改。

### 刷入 breed 方法

1. 刷入 ptpt52 的解锁 u-boot openwrt 固件

    特制固件下载地址：[openwrt-k2t-initramfs-factory-uboot-unlock.bin](https://router-sh.ptpt52.com/rom/openwrt-k2t-initramfs-factory-uboot-unlock.bin)
解锁 uboot，只用做刷机过渡版本（过渡版本无线不工作，正式版才有无线），不能作为正式使用。

2. 开启 telnet，已经开启请忽略这一步，已经刷其他，只要能登录 ssh 或者 telnet 都可以，开启 telnet 参考下面。

3. 把 openwrt-k2t-initramfs-factory-uboot-unlock.bin 上传到 /tmp/ 目录下，telnet 或者 ssh 登录后台，执行命令 `mtd -r write /tmp/openwrt-k2t-initramfs-factory-uboot-unlock.bin firmware` 刷入特制版本固件。

已经是 OpenWrt/LEDE 系统，natcap 系统，直接界面升级就好了，不需要刷，请直接下载另外一个固件，到界面升级就可以：[openwrt-k2t-uboot-unlock.bin](https://router-sh.ptpt52.com/rom/openwrt-k2t-uboot-unlock.bin)

下载的文件校验 MD5：
`fcbab4d79152aa4de38ee0bdd436883d` openwrt-k2t-initramfs-factory-uboot-unlock.bin  (解锁 uboot，临时使用，不完整)
`062173c2f254aa425b5649744ca0c92a` openwrt-k2t-uboot-unlock.bin (完整固件，解锁 uboot，用于 OpenWrt 界面升级的操作)

1. 进入 openwrt 界面 系统-管理权，开启 ssh 刷入特制版本的 OpenWrt 后，登录界面  <http://192.168.15.1/> 进入 系统-管理权 页面，开启 ssh 登录账号密码 root/admin
2. 下载 [breed](https://breed.hackpascal.net/breed-qca9563-phicomm-k2t.bin)，上传到 /tmp 目录 (注意对比 md5 ，特别是使用多线程下载器的)

3. 执行命令 `mtd write /tmp/breed-qca9563-phicomm-k2t.bin u-boot` 刷入 breed。breed 进入方法为开机时长按 rest 键，直至指示灯闪动，电脑使用网线插 lan 口访问 192.168.1.1 即可进入。在 breed 中可进行固件升级，备份，超频等。

也可参考此[教程](http://www.right.com.cn/forum/forum.php?mod=viewthread&tid=322841&extra=page%3D2%26filter%3Dtypeid%26typeid%3D19)

### [官改固件](http://www.right.com.cn/forum/thread-321512-1-1.html)

- 功能：官方固件去掉部分可以程序，添加 adbyby、koolproxy、S-S/S-S-R、KMS、WOL等功能。SSH（缺省用户名：root，密码 admin），telnet 控制。
- 特点：使用官方驱动，信号比第三方好；
- 缺点：功能少，虽然可以使用 opkg 安装软件包，但得自己修改添加 web 开关。
- [开启 telnet 方法](http://www.right.com.cn/forum/thread-321483-1-1.html)(2018.06.13 官方升级到 V22.23.1.158 后, 本工具不支持!)
- 刷入方法：
  - 1、先用上面的工具打开 K2T 的 telnet
  - 2、用 windows cmd 下的 telnet (默认关闭，需自行开启) 或 putty 连接 K2T。
  - 3、使 K2T 处于联网状态，在 telnet 中输入如下命令刷入官改版本
  `wget http://woo.iytc.net/tools/k2tnew.sh -O - |sh`
（ps:官方/官改固件设置 mentohust 不方便，不推荐在校内做一级路由使用）

- [救砖方法](http://iytc.net/wordpress/?p=3579)（需要 TTL 转 USB 工具，需拆机，要求一定动手能力。）

### Openwrt/LEDE

Openwrt/LEDE 不用多说，市面上几乎所有固件都是基于其进行的二次开发，得益于开源，有很多使用教程以及软件包。
（刷入 openwrt 需先刷 breed。)

- [ptpt52 Openwrt/LEDE](http://www.right.com.cn/forum/forum.php?mod=viewthread&tid=322475&typeid=19)
- [lean Openwrt](http://www.right.com.cn/forum/forum.php?mod=viewthread&tid=325321&page=1)

### Gargoyle(石像鬼)

链接: <https://pan.baidu.com/s/1Et-VEY3kg8GW9jzNno3vbQ> 提取码: `fm3k`
此为 lean 发布，暂未开源。石像鬼固件最有特色的便是其自带的 QOS。含 adbyby，openvpn。
缺点：安装软件包比较麻烦。

## 斐讯K2(PSG1218-64M)

Pandavan：
  [荒野无灯](https://p4davan.80x86.io/download/) [更新日志](http://www.right.com.cn/forum/thread-187654-1-1.html)
  [hiboyhiboyhiboy](https://opt.cn2qq.com/padavan)    [更新日志](http://www.right.com.cn/forum/thread-161324-1-1.html)
  [K2 刷入breed](http://iytc.net/wordpress/?p=1624)
另外还有官改固件，但本人觉得最好用的还是 padavan 故未列出。有需要的可自行去恩山查找。

## 品胜云座充(ar9331-pinsen)

可刷 TP-Link wr-703n v1 固件。具体请看此文 [Pisen云座充](https://virgo-233.coding.me/Pisen.html#more)
  [购买地址](http://www.right.com.cn/forum/forum.php?mod=viewthread&tid=209145&fromguid=hot&extra=&mobile=2)，裸板，18一块。
  [刷 Breed 教程](http://bbs.mydigit.cn/read.php?tid=1031661&ds=1)
hackpascal-Breed：[作者自建下载服务器](https://breed.hackpascal.net/) && [百度云](https://pan.baidu.com/s/1eRCPsMu) 密码：3if1 解压密码：baiduqusi
[更新日志](http://www.right.com.cn/forum/thread-161906-1-1.html)
