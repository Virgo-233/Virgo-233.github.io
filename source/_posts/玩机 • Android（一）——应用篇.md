---
title: 玩机 • Android（一）——应用篇
abbrlink: 9e7b6f05
date: 2018-07-22 13:45:34
tags: Android
---
<img src="https://i.loli.net/2019/09/02/jRZEznveFTCpocU.jpg" width="500" />
<!--more-->
闲来无事，写几篇水文。仅为我个人玩机经历，如果觉得对，欢迎参考，如果不对，请无视。全文分为 [应用篇](#apps)、Root 篇 和 进阶篇。

<span id="apps"></span>
<div class="note info"><p>应用前带 [root] 为需 root 权限应用，红色标记为可能会对设备造成损害的应用。黄色标记为需翻墙应用。大部分均可在酷安下载。</p></div>

## [酷安](https://www.coolapk.com/) 发现应用的乐♂趣<img id="github-emoji" src="https://i.loli.net/2019/06/08/5cfb5df7b796d58009.jpg" height="25" width="25" />

酷安算是一个不错的应用市场，有很多酷友自己开发的软件，很多大佬交流分享经验。虽然因为越做越大，出现了部分不好的现象，但总体环境还是很好的。特别值得关注的是软件的评论区，多逛逛往往会有很多收获。
![coolapk](https://i.loli.net/2019/06/08/5cfb5df8ecd1078695.jpg)

## [fooView](https://www.coolapk.com/apk/com.fooview.android.fooview)

借用小编的一段话：一款功能十分强大的浮动按钮，各种操作均可用手势完成，单手操作毫不费劲，使用起来也相当智能，毕竟和原来的操作方式有很大改变，需要时间适应，但适应后很可能就停不下来了，总之值得细细把玩一番。
![fooView](https://i.loli.net/2019/06/08/5cfb5dfa7d1ba49843.jpg)
fooView 集成了 应用启动器、文件管理器、图片浏览（编辑）器、录屏、长截图、屏幕取词及分词、OCR、浏览器（带去广告b及多线程下载器）、FTP/S 服务及客户端、SFTP、SMB、WebDAV 客户端等等多个功能。足以应付日常使用。可添加自定义任务实现部分 Tasker 的功能，如定时提醒喝水，定时显示天气等等。总而言之是一款功能十分强大的浮动按钮。

## [Via 浏览器](https://www.coolapk.com/apk/mark.via)

via 浏览器是酷友的作品，注重浏览体验，干净利落，化繁为简，简约而不简单。apk 体积仅 503KB 安装后也才 17M ，这相比于其他浏览器动辄上百 M 占用，真的是小太多了。当然 via 小也是有原因的，因为它不带内核，调用的是系统的 WebView，对于系统较新或者能更新 WebView 的手机来说很好，如果是系统比较老的建议使用 [夸克](https://www.coolapk.com/apk/com.quark.browser) （UC 团队的作品，也很不错）。

- 功能：
  1. 没有开屏广告，没有新闻推荐，没有广告植入等等一切和浏览器无关的功能。安安静静的做一个浏览器。
  2. 支持书签云同步
  3. 支持去广告（可手动标记或同步现成的规则，也可使用 via 的 hosts 拦截）
  4. 支持油猴脚本（油猴脚本大多数均为电脑界面，手机上使用可能会不兼容）
  5. 支持自定义浏览器标示，查看源码，查看网络日志，资源嗅探（可调用 ADM 下载或 MXplayer 在线播放）。
  6. 自定义主页：支持使用 HTML 代码以及 CSS 进行美化，也可使用完整的 html 网页（下图使用的就是 html 文件为主页）

- 缺点： 依赖于系统 WebView 因而不像 QQ 浏览器， UC 浏览器等自带内核浏览器功能多。如 视频播放无法手势控制、悬浮播放。没有账号密码自动填写（作者说会解决）

![Via](https://i.loli.net/2019/06/08/5cfb5e794404686948.jpg)

注：via 使用二维码扫描需勾选 via设置-插件-二维码扫描 按提示下载安装 [二维码扫描](https://www.coolapk.com/apk/mark.qrcode) 软件即可。下载管理默认使用系统内置下载器，可勾选  via设置-插件-下载管理 启用 ADM 下载器。

附：

- [via 可用脚本及部分主页](http://via-app.cn/via)

- ADM 下载器 `https://www.coolapk.com/apk/com.dv.adm.pay` 复制链接到 酷安 客户端打开。

- 主页文件(与图中有部分差异)链接:`https://pan.baidu.com/s/1tMZ8Eie_ewVKSIMtLdnpoQ` 密码:`2htc`

## <div class="note danger"><p>[黑阈](https://www.coolapk.com/apk/me.piebridge.brevent)</p></div>

对付毒瘤的一大神器，可控制 APP 权限，冻结 APP。需使用 ADB 或 root 开启。免费版有很大限制，支付 5$ 开启所有功能。[黑阈版本与价格](https://jianyu.io/br/price.zh.html) 作者会不定时进行活动，可关注其酷安动态。

![brevent](https://i.loli.net/2019/06/08/5cfb5e9153b2e47947.jpg)

附：[黑阈使用说明书](https://jianyu.io/br/br.pdf) （PDF 文件，点击即可下载。强烈建议初次使用时先看一遍）

<span id="jump"></span>

## [root][My Android Tools](https://www.coolapk.com/apk/cn.wq.myandroidtools)

一款神器，能干的事情很爽，遇到一些个流氓app，这东西有用。My Android Tools 可以禁用应用的组件如 服务、广播接收器和活动 等。服务即为我们所用的功能，广播接受器负责接收系统的状态等等，而活动都是在我们使用过程中才启动。活动除了广告活动（带 AD、advertising 字样的 activity ，注意区分 download  等活动）一般不用去禁用，即便禁了效果也不大。主要要禁用的是活动和广播接收器。ps：禁用广告需使用 Pro 版

- 广播接收器
  
  如果某个应用你不想让它推送消息那么可以把广播接收器全部禁用了，大多数应用的广播接收器都可以全部禁用（不推荐）。当然最好是针对某一个进行禁用，如 带 boot 的大多为开机自启，对于不需要开机自启的软件可以禁用。带 push 的均为消息推送，保留一个就行（如果软件同时支持 FCM 和国内推送服务且手机装了 Google 服务建议保留 GCM 和一个国内推送服务，MIUI 用户建议保留 Mipush）。

- 服务

  这个是重点，对付毒瘤软件有奇效。现在很多应用都变得越来越臃肿。拿 QQ
 来说，运行时内存占用可达 三四百M ，但这里面又有多少是我们真正需要的呢？而使用 My Android Tools 进行调校后 QQ 仅仅占用 30M 左右，并且没有任何功能损失。在广播接受器中说过关闭消息推送，但最有效的还是 服务 和 广播接收器 一起禁用。国内消息推送服务各自为营，为了保活不择手段，当然这是厂商为了保证消息能及时准确推送到用户手里设置的，但这样手机就遭殃了。每打开一个应用就会启动一个推送服务，而推送服务一直挂在后台，部分推送服务甚至会唤醒用户未打开的应用，被唤醒应用又会唤醒其他未打开应用。这就是为什么一打开 xx软件 然后看下后台全家桶全被打开了的原因。国内推送服务有 腾讯的 XG、小米的 XMPush、华为的 HuaweiPush、魅族的 MeizuPush、个推的 gtpush、极光的 jpush、OPPO（coloros）、阿里、百度等等厂商的推送服务。还有 融云 sdk（rong）、个推 sdk（igexin）、友盟 sdk（umeng）等也提供了推送服务。其中支持 XMPush 的应用最多，体验也更接近于 FCM。Android 的 FCM 消息推送其实是很不错的，然而国情所限，体验并没有本土推送服务好。禁用推送服务时可直接搜索 push 展开服务全名进行禁用即可。

My Android Tools 可以备份还原自己的禁用列表，也可使用他人分享的备份文件进行恢复。部分组件可能会自动恢复需辅助使用 [My Android Tols Xposed](https://www.coolapk.com/apk/cn.wq.myandroidtoolsxposed) ，此为 Xposed 模块，在第三篇中会介绍如何使用 Xposed 模块，此处不做过多介绍。
![myandroidtools](https://i.loli.net/2019/06/08/5cfb5eb468b7093584.jpg)

## [root][AppOpsX](https://github.com/linusyang92/AppOpsX)

此为 AppOpsX 加入 IFW 支持，原版只含 appops（权限管理）。可限制软件调用权限（即便运行软件时允许权限，若 AppOps 禁止则实际仍为禁止) 软件使用需将其安装为系统程序。（使用前建议查看项目 REANME）
![AppOpsX](https://i.loli.net/2019/06/08/5cfb5ecd254ea43307.jpg)

在设置中可开启 Intent 防火墙，默认长按显示服务，之后的使用方法与 [My Android Tools](#jump) 无异。效果与 My Android Tools一样，甚至更好。My Android Tools 的配置可转换为 IFW 配置。[转换项目地址](https://github.com/apkjam/MAT2IFW)

## Tasker

`https://www.coolapk.com/apk/net.dinglisch.android.taskerm` 复制链接使用酷安客户端打开。

一款系统增强型的软件，可以实现多种自动控制场景，功能非常强大。有一定上手难度，不过好在可以导入别人制作好的配置文件。

![Tasker](https://i.loli.net/2019/06/08/5cfb5ee82312876735.jpg)

## <div class="note warning"><p>Shadowsocks/SSR</p></div>

这两个不用多说，爬墙必备工具。

## [锤子BigBang](https://www.coolapk.com/apk/com.forfan.bigbang)

来自于锤子手机 BigBang 功能，但和锤子手机并没有关系。可以全局复制文字，将文字拆分成词组，随意编辑、拖拽组合，提高效率! 单击、双击、长按、复制等多种选词方式随心选。包含翻译、OCR 取词、区域截图、剪贴板等功能。个人觉得分词功能比 fooView 好用。
![BigBang](https://i.loli.net/2019/06/08/5cfb5dfa6617a57290.jpg)

## [MT管理器 2.0](https://www.coolapk.com/apk/bin.mt.plus)

一款强大的文件管理工具和APK逆向修改神器。普通文件管理器的功能都有，特色功能为 APK 编辑功能，主要有 DEX 编辑，ARSC 编辑，XML 编辑，APK 签名、APK 优化、APK 共存、去除签名校验、RES 资源混淆、RES 反资源混淆、翻译模式等。APK 编辑免费用户有部分限制。

![MT](https://i.loli.net/2019/06/08/5cfb5f1d3a3d544252.jpg)

## <div class="note warning"><p>Telegram <https://telegram.org></p></div>

俄罗斯的一款加密即时聊天软件，具有高度保密性。

## [FastHub](https://github.com/k0shk0sh/FastHub)

一款开源的 GitHub 客户端。界面很简洁，该有的功能都有。
![FastHub](https://i.loli.net/2019/06/08/5cfb5f3b3d58236825.jpg)

## [Mobilism](https://forum.mobilism.org/index.php)

国外知名破解软件站点，发布更新各种破解付费/去广告软件（国外软件居多）。下载需翻墙。

![Mobilism](https://i.loli.net/2019/06/08/5cfb5f3c1600754235.jpg)

## [SD Maid](https://www.coolapk.com/apk/eu.thedarken.sdm)

一款很不错的 SD 卡清理工具。授予 root 权限后效果更好。

![SD Maid](https://i.loli.net/2019/06/08/5cfb5f3c8d9d787786.jpg)

## [存储空间清理](https://www.coolapk.com/apk/com.ktls.fileinfo)

与 SD Maid 各有优劣。高级功能需付费 3元。

![fileinfo](https://i.loli.net/2019/06/08/5cfb5f779702e75148.jpg)

## [BusyBox](https://www.coolapk.com/apk/stericson.busybox)

Linux 工具里的瑞士军刀,集成了三百多个最常用Linux命令和工具。有无 root 权限均可安装，root 下安装操作不当可能会导致系统无法启动。MIUI 自带 busybox （非最新）。

![BusyBox](https://i.loli.net/2019/06/08/5cfb5f79416ad74300.jpg)

## [root]钛备份

`https://www.coolapk.com/apk/com.keramidas.TitaniumBackup`
复制链接使用酷安 app 打开。
非常强悍的程序和系统备份工具,需安装 BusyBox ，可备份到 Google Drive、Dropbox（需开启增强版）。部分功能需付费。

![TitaniumBackup](https://i.loli.net/2019/06/08/5cfb5f7943d0974266.jpg)

## [Termux](https://www.coolapk.com/apk/com.termux)

一个强大的终端模拟器，可使用 pkg 及 apt 包管理器。

![Termux](https://i.loli.net/2019/06/08/5cfb5f795eb5e93872.jpg)

## <div class="note danger"><p>[root] [3C Toolbox](https://www.coolapk.com/apk/ccc71.at)</p></div>

一个非常实用的工具箱，包含多个功能。

![3C Toolbox](https://i.loli.net/2019/06/08/5cfb5fe9c017513285.jpg)

优秀的软件太多太多，这里只写了一部分我正在使用的，并不代表只有这些。