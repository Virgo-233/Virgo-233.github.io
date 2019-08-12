---
title: 玩机 • Android（二）——ROOT 篇
tags: Android
abbrlink: fab8c3b3
date: 2018-10-27 13:15:56
---
## Root (Android)

首先来了解一下 ROOT 是什么：{% blockquote wikipedia https://zh.wikipedia.org/zh-hans/ROOT_(Android) ROOT_(Android) %}Root 是 Android 系统的一个术语，它使得用户可以获取 Android 操作系统的超级用户权限。Root 能够帮助用户越过手机制造商的限制，得以卸载本身预装的程序，或运行需要系统权限的动作。Android 系统的 Root 与苹果 iOS 系统的越狱类似。{% endblockquote %}
<!-- more -->

简单点说就是当你拥有了 ROOT 权限你才能对你的手机想干嘛就干嘛。当然权利越大责任也越大，也意味着会面对更大的风险。因为 ROOT 是非官方行为，所以很多手机产商对 ROOT 后的手机不提供免费维修服务。现在大多数手机均加入了分区保护，未解锁 Bootloader 的情况下无法进行 ROOT 或刷机操作。

ROOT 的原理其实是通过系统漏洞或官方后门将 SU 可执行文件复制到 Android 系统的 /system 分区下。为了让用户使用 ROOT 权限，防止手机上任意软件获取 ROOT 权限还需安装一个权限管理软件进行管理。目前主流的超级权限管理工具非 Magisk 和 SuperSU 莫属了。还有如 MIUI、Flyme 以及部分类原生系统自带 ROOT。

## 获取 ROOT

获取 ROOT 权限大致有三种方法。一是通过系统漏洞或官方后门通过软件获取，一是直接在刷机包中内置，再就是通过 Recovery 刷入特定的刷机包。最后一种方法应该是用的最广泛也是最简单的了。使用 Recovery 获取 ROOT 需要第三方 Recovery，有 Bootloader 锁的手机还需先解锁。第三方 Recovery 有 TWRP、CWM 等。前面说过 超级权限管理工具有 Magisk 和 SuperSU，它们均提供了对应的卡刷包，刷入即可获取 ROOT 权限。其中 Magisk 并不仅仅只有 ROOT 管理功能，具体将在第三篇中介绍。

### SuperSU

 官网: <http://www.supersu.com/>

SuperSU 分 systemless 和 xbin 两种模式，systemless 模式不更该 /system 而是在 /data 目录创建一个 img 文件，在系统启动是加载此文件，好处是不破坏系统，坏处是授权响应慢，可能会因为 SuperSU APP 后台被杀死而无法授权；xbin 模式为将文件写入 /system ，SuperSU APP 将会安装在 /system 目录，需手动对 boot 打补丁，不然会卡开机界面，优点是授权响应快，恢复出厂设置仍能保留 ROOT ，缺点是会破坏系统完整性。官网下载的卡刷包会自动判断使用哪种模式因而不用担心用错。

卡刷包可在官网下载，进入 Recovery 刷入即可。有时候可能会遇见刷入后桌面不显示 SuperSU APP ，此时可打开拨号程序输入 `*#*#1234#*#*` ，同理输入这个也可以在桌面隐藏 SuperSU APP。

### Magisk

MagiskManager: <https://magiskmanager.com/>

XDA： <https://forum.xda-developers.com/apps/magisk>

Github： <https://github.com/topjohnwu/Magisk/releases>

Magisk 是一个台湾同胞开发的应用软件，其主要功能是不修改 /system 实现修改的效果，自带了 ROOT 管理。
与 SuperSU 一样，需下载卡刷包刷入。卡刷包可在上面三个链接中下载到，也可以直接安装 Magisk Manager APP，然后在 APP 中下载卡刷包。Magisk 与 SuperSU 并不兼容（实际上是因为两个都会修改同一个地方)如果已经刷了 SuperSU 再刷 Magisk 时会出错，此时去 SuperSU 设置中清除 SuperSU 即可（也可以刷入官方 boot）。

最后还是那句话：权利越大，责任越大。如果你不清楚你在干什么那么最好不要授权应用 ROOT 权限。当然也没必要对手机 ROOT 后的安全问题太过担心，只要注意授权管理软件的授权提示不乱给软件权限就没事。
