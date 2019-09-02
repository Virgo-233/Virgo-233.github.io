---
title: 玩机 • Android（三）——进阶篇
tags: Android
abbrlink: 40e3c7df
date: 2018-12-23 14:20:56
---

- [玩机 • Android（一）——应用篇](https://hoshizora.tw/posts/9e7b6f05.html)
- [玩机 • Android（二）——ROOT 篇](https://hoshizora.tw/posts/fab8c3b3.html)

Android 有两个模式：Recovery 和 Bootloader，也叫卡刷模式和线刷模式（部分手机可能不一样，功能都差不多）。
<!-- more -->

## Bootloader
  
系统在启动之前需要通过 bootloader 启动，手机启动的时候基带执行初始化，然后引导系统内核，直到系统启动。厂商为了安全，Google 也要求上锁，因而现在的手机基本都对 bootloader 上锁了，不解除就无法对 bootloader 进行更该（官方一般提供了解锁通道，申请通过后就能解锁）。Bootloader 模式通过电脑对设备进行清除数据、系统升级等操作，REC 也是在此模式下刷入的，救砖一般也是进的这个模式。Bootloader 一般是按住电源键和音量减键进入。进入后用数据线连接手机和电脑，电脑会自动安装所需驱动（没有自动安装的可以百度 Bootloader 驱动手动安装），安装好驱动后需要去下载 ADB 工具包
  
- Windows <https://dl.google.com/android/repository/platform-tools-latest-windows.zip>

- Mac <https://dl.google.com/android/repository/platform-tools-latest-darwin.zip>

- Linux <https://dl.google.com/android/repository/platform-tools-latest-linux.zip>

进入工具包目录，在当前目录打开终端，输入 `adb devices`会显示当前设备，如果没显示则可能是驱动没装好。

![Screenshot_20181223_154659.png](https://i.loli.net/2018/12/23/5c1f3dca16d41.png)

将下载的 Recovery 文件放在当前文件夹中，输入`fastboot.exe flash recovery MI-NOTE-TWRP3.1.0.img`，刷入 Recovery （MI-NOTE-TWRP3.1.0.img 为文件名字），之后输入`fastboot.exe boot MI-NOTE-TWRP3.1.0.img`进入 Recovery 模式。Bootloader 还有很多其它的功能，就不多说了（我是不会说其实是我不会其它的（ ￣ー￣））。

## Recovery

Recovery 看它的名字大概够强猜出其功能了。自带的 Recovery 是非常简陋的，并不能满足我们的要求，所以需要使用如 TWRP、CWM 之类的第三方 REC。替换方法在前面 Bootloader 中有。进入 REC 的方法不同品牌可能有所不同，MIUI 是按住电源键和音量加音量减，出现 logo 后屏幕突然一亮之后松手即可进入。原版 TWRP 是没有中文的，不过一般都能在网上找到支持中文的版本。主要功能为安装、清除、备份、恢复、挂载、设置、高级功能。

- 安装

    这个就是刷机、获取 ROOT、安装 Magisk、安装 Xposed 等要用到的。点击 Install 进入文件选择界面，默认是刷入卡刷包也可以点击右下角刷入镜像刷入 Recovery 或则 Boot。
- 清除

    可以恢复出产设置，也可以格式化某一分区。
- 备份/恢复
  
    备份/恢复分区
- 挂载

    挂载分区，一般用不上，使用高级功能式可能会用到。某些手机支持 OTG 功能要在 Recovery 下使用 OTG 存储需进行挂载。
- 设置
  
    一些 Recovery 的设置项，比如切换语言调节显示亮度等。
- 高级功能

    文件浏览器、终端等。进入某些目录时需先保证已近挂载，否则会显示空白。
- 重启

    高级重启功能。包含重启到 Bootloader、重启到 Recovery、正常重启。

介绍完 Bootloader 和 Recovery 后，接下来就是 Magisk 和 Xposed 了。因为这两个都非常强大但也有很大可能导致手机出现问题，所以必须要先准备好第三方 REC 以备不时之需。

## Magisk

- 安装

    方法在第二篇 ROOT 篇中已进行介绍此处不在赘述。

- 使用
  
  仓库中有很多不错的模块，点击模块即可查看详细信息。也可以手动安装自己下载的模块。

  注：Magisk 模块可以看做是将模块内容替换系统中对应内容。安装模块前最好打开查看下是否对自己有用。

## Xposed

官网：<https://repo.xposed.info/>

Xposed 框架是一款可以在不修改 APK 的情况下（修改系统）影响程序员运行的框架服务，基于它可以制作很多功能强大的模块。（刷入 Xposed 会对手机性能有一定影响，且随着启用模块越多影响越大（单框架影响不大，主要是模块），开机时间也会变长）

- 安装
  
  安装时确保已解锁 Bootloader 、拥有 ROOT 权限。
  下载 [Xposed Installer](https://www.coolapk.com/apk/de.robv.android.xposed.installer) 安装后打开，先下载卸载包以防出问题后可以卸载。然后点击安装，Install 和 Install via recovery 都差不多，一个是下载后直接安装一个要手动进 REC 卡刷。
  
  注：Xposed 兼容性最好的是原生类原生之类的 ROM。国产 UI 可能会卡开机。虽然最新版兼容性已经很好了，但在 MIUI 上还是会出现主题无法修改状态栏样式（SolarWarez 针对 MIUI 发布了修改版，可以完美使用，但已不再更新，目前只支持 Android 6.0 及以下系统）的问题。作者也表示不会针对 MIUI 等进行特别优化。目前 Xposed 最高支持 sdk27 即 Android 8.1。

  另一种方法是手动下载卡刷包在 REC 中刷入。

  下载地址：<https://dl-xda.xposed.info/framework/>
  需要注意的是安装包 api 和 cpu 架构必须和手机对应。
  ![Screenshot_2018-12-23-17-11-51-990_de.robv.android.xposed.installer_1.png](https://i.loli.net/2018/12/23/5c1f58022cc48.png)

- 使用

    刷入后第一次开机示安装应用数可能需要很长时间，期间耐性等待即可。之后就不用这么久了。

    此为我所使用的模块：
    ![Screenshot_2018-12-23-17-51-24-354_de.robv.android.xposed.installer.png](https://i.loli.net/2018/12/23/5c1f5b674418b.png)
    以上模块均可在[酷安](https://www.coolapk.com)和 Xposed 仓库中找到（点击 Xposed Installer 左上角，侧栏中的下载项就是仓库）。

最后再说下，Magisk 能和 Xposed 共存，可以在 Magisk 中安装 Xposed，找到对应的 Magisk 模块安装就行，不过不论是否修改了系统，安装 Xposed 后 Magisk 的 systemless 特性都被破坏，并且使用 Magisk 安装的 Xposed 必须修改版 Xposed Installer 才能识别（点击 Magisk 模块即可看见下载地址）。还有就是 Magisk 和 Xposed 两个是不同的东西，Magisk 实现不了 Xposed 的很多功能。很多人觉得 Xposed 能实现的 Magisk 也能实现是错误的。