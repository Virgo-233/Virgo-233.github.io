---
title: Pisen云座充
author: Chen
tags:
  - OpenWrt
categories:
  - 路由器
abbrlink: 13b1ea83
date: 2018-04-14 12:20:00
---
去年在基安看见的一个[帖子](http://www.right.com.cn/forum/forum.php?mod=viewthread&tid=209145&fromguid=hot&extra=&mobile=2)，品胜云座充的拆机板，看了下可以刷 open-wrt 以及 Tp-link WR703n 的包还有 usb 接口就入手了三块板子。到手后就全刷了 u-boot 刷了个 open-wrt 后就放抽屉里吃灰了。后面翻出来几次装了 mentohust 能登录学校的锐捷后就又吃灰了。 最近因为在弄主路由 k2 的内网穿透，接触到了 opkg 包管理器，突然想到了吃灰的云座充。回到寝室就刷了 wr703n 的 LEDE。接着就是弄 usb 挂载以及存储空间的扩展。

ps: LEDE 默认不开启无线网卡，可使用网线连电脑，访问 192.168.1.1 打开无线网卡。若要桥接则要打开 DHCP ，只作 Ap 可不设置，默认静态 ip。

1. [安装 usb 设备支持](https://wiki.openwrt.org/doc/howto/usb.storage)

    - `kmod-usb-storage` ——必须。大概是 内核支持USB大容量存储设备？
    - `kmod-fs-<file_system>` ——必须。格式化分区的文件系统,包含 kmod-fs-ext4, kmod-fs-hfs, kmod-fs-hfsplus, kmod-fs-msdos, kmod-fs-ntfs, kmod-fs-reiserfs and kmod-fs-xfs.我用的是 ext4 分区的，所以装的 kmod-fs-ext4。
    - `kmod-usb-storage-extras` —— 可选。内核支持更多驱动程序，例如SmartMedia读卡器。不知道干嘛的:p.
    - `block-mount` ——必需。用于安装和检查块设备（文件系统和交换）和热插拔功能（在设备插入时识别）的脚本。后面的扩展内部存储也要用到。
    - `kmod-scsi-core`——Any mass storage is a generic SCSI device.不知道干嘛的，机翻是：任何海量存储都是通用的 SCSI 设备。
2. [配置 fastab](https://wiki.openwrt.org/doc/uci/fstab)
    - 自动创建初始 fstab：
        ssh 连接路由器 输入`block detect > /etc/config/fstab`。或者在网页的block-point 项点击自动配置规则。（LEDE 后台管理默认是英文的可以安装 luci-i18n-base-zh-cn 安装完成后就是中文界面了，如果没有可以去设置改成中文）
    - 修改 fastab：`vi /etc/config/fstab` 也可在网页进行配置，但某些参数配置不了。
    - 设置 fastab 开机自启：`/etc/init.d/fstab enable`
    fastab 还有很多参数，具体可以去 [Wiki](https://wiki.openwrt.org/doc/uci/fstab) 查看。

3. [扩展内置存储](https://wiki.openwrt.org/doc/howto/extroot)这个可以让路由器从外部存储的镜像启动，我只用了扩展路由的内部空间。

    - 将内置存储 /overlay 的文件复制到 USB 存储中：
    `mount /dev/sda1 /mnt ; tar -C /overlay -cvf - . | tar -C /mnt -xf - ; umount /mnt`
    - 使用以下命令创建fstab:

    ```ash
    block detect > /etc/config/fstab; \
        sed -i s/option$'\t'enabled$'\t'\'0\'/option$'\t'enabled$'\t'\'1\'/ /etc/config/fstab; \
        sed -i s#/mnt/sda1#/overlay# /etc/config/fstab; \
        cat /etc/config/fstab;
    ```

    - 最后使用下面命令允许安装大于 /rom 的软件：
   `echo option force_space >> /etc/opkg.conf` 也可在网页端进行修改。
在网页端可以看见 / 分区和 /overlay 变大了，如果 /  分区没变可以插着优盘重启后应会成功挂载。
我的是 16g 的内存卡，分了个 128M 的分区出来，可以看到两个分区都正常挂载了，并且成功将 128M 的分区扩展到内部存储。
![fstab](https://ww1.sinaimg.cn/large/ec245efdgy1fqc7o9xpvxj211y0kg41c.jpg)
到此品胜云座充的折腾告一段落，接下来就是进行软件方面的设置了。

<div class="note success"><p>2018/6/19 更新：openwrt固件</p></div> 链接: <https://pan.baidu.com/s/1MqWci4ElhyytjqgCj9GnFw> 密码: `7ckw`
![op](https://ws1.sinaimg.cn/large/ec245efdgy1fsguadvf4xj211y0kgmzo.jpg)
