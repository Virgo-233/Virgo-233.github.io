---
title: 手机使用 rclone 挂载网盘
abbrlink: 2a60e472
date: 2019-07-16 22:22:05
---
{% note success %}
### 2019.08.02 更新
作者更新了两个版本，v1.5 支持绑定到 /sdcard/cloud/ 了，在配置目录创建 `.bindsd` 文件启用，另外加入了网络检测，检测地址为 google.com ，需自行解决网络问题。v1.6 (当前版本) `.*.parame` 配置文件中增加了`ADD_PARAMS`和`REPLACE_PARAMS`用于添加和替换 rclone 挂载参数； 添加了一个 `.blobal.param` 配置文件用于修改全局参数，REANME 中只写了 `NETCHK_ADDR`和`BINDPOINT`用于修改网络检测地址和挂载点，还可以修改其他的配置项修改默认值，但目前并不是很完善，部分默认参数无法修改。
{% endnote %}

{% note info %}
### 提示
1. 使用模块前建议先仔细阅读模块说明（README），这个模块并不是装上就能用的。
2. 所有 param 文件中最后必须空一行，不然无法识别最后一行
{% endnote %}

先来两张效果图：
![Screenshot_2019-07-16-20-25-42-875_bin.mt.plus.png](https://i.loli.net/2019/07/16/5d2dc2896ef0e90595.png)
![Screenshot_2019-07-16-20-14-53-809_com.termux.png](https://i.loli.net/2019/07/16/5d2dc289cbdc671568.png)
　　不久前了解到了 [rclone](https://rclone.org/) 这个东西，rclone  是一个支持在多个网盘及存储服务同步文件和文件夹的命令行程序，使用 GO 语言编写。支持的服务列表可以在官网查看，像微软的 Onedrive 、谷歌的 GDrive 、阿里云对象存储以及支持 FTP、webdav 等协议的存储服务都支持，基本上覆盖了常见的存储服务提供商。使用 rclone 可以很方便的进行管理。
　　当然今天要说的是 rclone 的挂载功能，rclone 可以将网盘挂载到本地当做磁盘使用。rclone 挂载需要 fusermount 这个程序，在 PC 端很简单，一条命令就安装好了，但在手机端需要自行编译arm 架构的。我在网上找到个能用的 fusermount ，挂载成功了，但只能运行挂载命令的程序才可以访问，这样没有很大意义，后面就放弃了。最近 magisk 仓库更新了个 [rclone-mount](https://github.com/Magisk-Modules-Repo/com.piyushgarg.rclone) 模块，将 rclone、fusermount都提供了，并且写好了挂载脚本，作者解释了只能运行挂载命令的程序才能访问的原因。
　　使用模块需要先安装 magisk，并且由于 Android 系统限制，必须使用 root 权限才能挂载。magisk 安装这里就不多说了，我另一篇文章有介绍。因为模块目前有个 bug 如果没有找到 rclone.conf 文件模块在刷入时会卡住，如果是之前没用过 rclone 的需要先去创建 /sdcard/.rclone/rclone.conf 文件，这样就不会卡在模块安装界面了。安装完模块后接下来是配置 rclone，rclone 用法百度有很多教程，这里我简单说下。
　　首先要有一个 rclone 支持的网盘，比如 Onedrive，由于需要运行命令，所以需要用到终端，这里我用的是 Termux（推荐），使用其它终端也可以。
　　先运行 su 获取 root 权限，然后运行 `export XDG_CONFIG_HOME=/data/media/0` 设置 rclone 配置目录，以免找不到配置文件或者无权限。 `/data/adb/modules/com.piyushgarg.rclone/rclone config` 会显示当前已配置好的，我的之前已经添加了三个。![Screenshot_2019-07-16-21-14-11-051_com.topjohnwu.magisk.png](https://i.loli.net/2019/07/16/5d2dce17eddb599440.png)
输入 n 回车创建一个新的远程地址，提示输入名字，这个可以随便取一个方便记住的名字，后面使用的时候就是用的这个名字，之后选择远程地址服务提供商，这里我用的  Onedrive 选 19，其它服务提供商也一样，只是在后面的操作有所不同，具体可以去 rclone 官网查看。选择 19 后接下来的东西用过 pyone、oneindex 等第三方客户端的会很熟悉，没错就是 client_id 和 client_secret，在这里我们都直接回车使用默认的就行。接下来会提示是否更改配置，这个是一些 rclone 的配置属性，直接输入 n 使用默认的即可。最后就是最重要的一步了，提示是否使用自动配置，这里选择 Y，输入后会自动打开浏览器，如果没有，可以手动打开上面显示的地址，登录要使用的账号进行授权，授权成功后返回终端，这里要注意如果是没有管理员或者管理员限制使用第三方应用的是没法认证的。之后会询问是哪种类型的存储，选择 1 也就是 Onedrive 那个就好。然后终端上会显示当前配置，询问配置是否正确选择 y 就回到了刚开始的界面，输入 q 退出。到此 rclone 的配置已经完成，接下来需要把配置文件放在指定位置。配置文件是放在 `/data/media/0/rclone/rclone.conf`，也就是内置存储下的 rclone/rclone.conf 运行 `su -c "cat /data/media/0/rclone/rclone.conf /data/media/0/.rclone/rclone.conf"` 将配置文件添加到内置存储，最后先输入 su 授予 Termux root 权限，再运行 `su -c /sbin/rclone remount` 等待命令运行完成即可。默认是挂载在 /mnt/cloud/ 目录下，目前无法挂载到 /sdcard 不过作者将在下一版添加这个功能。
　　最后再附上我的一个利用 rclone 进行备份的脚本，可以保存历史版本，语音播报备份情况。使用 tasker 之类的软件定时运行即可。需要安装 Termux 以及 Termux-API，并且 Termux 安装了 termux-tools，我把 rclone 添加到系统 PATH 里了，所以可以直接调用，如果 rclone 不在 /system/bin/ 或者 /system/xbin/ 中就需要使用 rclone 文件路径来调用（注意文件权限）。
``` bash
#!/system/bin/env sh
export LANG=C.UTF-8
export RCLONE_LOG_LEVEL=INFO
export RCLONE_LOG_FORMAT=date
# export RCLONE_BACKUP_DIR="love:/archive/$(date +%Y)/$(date +%F"_"%T)"
export RCLONE_BACKUP_DIR="love:/old_files"　　// 远程地址存储旧版备份文件的文件夹夹
export RCLONE_SUFFIX="_$(date +%F_%T)"　　// 旧备份文件名格式：原文件名_日期_时间
export RCLONE_LOG_FILE=/storage/emulated/0/rclone.log　　#!/system/bin/env sh
export LANG=C.UTF-8
export RCLONE_LOG_LEVEL=INFO
export RCLONE_LOG_FORMAT=date
# export RCLONE_BACKUP_DIR="love:/archive/$(date +%Y)/$(date +%F"_"%T)"
export RCLONE_BACKUP_DIR="love:/old_files"
export RCLONE_SUFFIX="_$(date +%F_%T)"
export RCLONE_LOG_FILE=/storage/emulated/0/rclone.log　　// 日志
export XDG_CONFIG_HOME="/storage/emulated/0/ADM/.config"　　// 配置文件


SD=/storage/emulated/0　　// 内置存储

# 要备份的目录
buckup_dir=(".fooView" "ADM" "baidu" "MyAndroidTools" "Pictures" "searchlite" "ViPER4Android" "Xposed_Edge_Icon" "YueDu" "习")

# 清空日志
:>$RCLONE_LOG_FILE

# 检测网络链接
# 超时时间
timeout=5
	
# 目标网站
target=baidu.com
 
# 获取响应状态码
ret_code=`curl -I -s --connect-timeout $timeout $target -w %{http_code} | tail -n1`
 
if [ "x$ret_code" = "x200" ]; then
    XiaoAiTTS "网络连接正常,开始备份！"
    echo "网络连接正常,开始备份！">>$SD/rclone.log
    
    for dir in ${buckup_dir[@]}
    do
        echo "正在备份 $SD/$dir"
        rclone sync "$SD/$dir" love:/snapshot/"$dir"
    done
    
XiaoAiTTS "rclone 备份完成！"
echo "$(date +%F"-"%T)\t备份完成！\n">>$SD/rclone.log

else
    XiaoAiTTS "网络连接异常，停止备份！"
    echo "网络连接异常，停止备份！">>$SD/rclone.log
fi
export XDG_CONFIG_HOME="/storage/emulated/0/ADM/.config"


SD=/storage/emulated/0

# 备份目录
buckup_dir=(".fooView" "ADM" "baidu" "MyAndroidTools" "Pictures" "searchlite" "ViPER4Android" "Xposed_Edge_Icon" "YueDu" "习")

# 清空日志
:>$RCLONE_LOG_FILE

# 检测网络链接
# 超时时间
timeout=5
	
# 目标网站
target=baidu.com
 
# 获取响应状态码
ret_code=`curl -I -s --connect-timeout $timeout $target -w %{http_code} | tail -n1`
 
if [ "x$ret_code" = "x200" ]; then
    XiaoAiTTS "网络连接正常,开始备份！"
    echo "网络连接正常,开始备份！">>$SD/rclone.log
    
    for dir in ${buckup_dir[@]}
    do
        echo "正在备份 $SD/$dir"
        rclone sync "$SD/$dir" love:/snapshot/"$dir"
    done
    
XiaoAiTTS "rclone 备份完成！"
echo "$(date +%F"-"%T)\t备份完成！\n">>$SD/rclone.log

else
    XiaoAiTTS "网络连接异常，停止备份！"
    echo "网络连接异常，停止备份！">>$SD/rclone.log
fi
```
　　其中 XiaoAiTTS 是我为了方便调用 Termux-API 的 TTS  工具写的小脚本，把它放在 /system/bin 或者 /system/xbin 这样就可以随便调用了，具体内容是：
``` bash
#!/system/bin/sh
export LD_LIBRARY_PATH=/data/data/com.termux/files/usr/lib
export PATH=/data/data/com.termux/files/usr/bin:/data/data/com.termux/files/usr/bin/applets

termux-tts-speak $1
```
　　rclone 还有很多功能，我就不一一介绍了，官网上面对每一个命令都有详细点解释，参考官方文档即可。