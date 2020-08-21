---
title: Android_rclone_backup
tags: Android
abbrlink: 1258516f
date: 2020-02-29 14:42:35
---
<img src="https://cdn.jsdelivr.net/gh/cxyzzz/CDN@20.07.08/images/posts/Yfqraxhwpugl3Uo.webp" width="500" />
<!-- more -->

<details>
<summary>点击显示更新信息</summary>
{% note success %}
### 2020.08.21 更新
1. 设置 CHECKERS 为 16，TRANSFERS 为默认值（4）
2. 更改 rclone 运行 CPU 优先级和 IO 优先级（nice: 19, ionice: 7）
3. 添加 Github Gist

{% gist 64546e524ae0de3111685926ed955785 syncone %}

<details>
<summary>
{% endnote %}
</details>

之前写了篇[在手机上使用 rclone 挂载网盘](https://cxyzzz.github.io/posts/2a60e472.html)的教程，文末附带了个备份脚步，最近看 rclone 文档新发现了几个参数，可以优化下之前的脚本，索性新开一篇文章记录以下。

## 备份脚本

之前的脚本用于备份其实还是可以的，只是要备份的路径是写死的，如果要增加就得修改脚步，也没办法排除某个或某类文件。新版主要增加的就是备份目录的配置，使用另一个文件存储备份目录，并且支持简单的正则过滤。这主要得益于 rclone 的 include(-from)、exclude(-from)、filter(-from) 参数，其功能基本可以从名字看出来，include　是包含，exclude 是不包含，filter 则是两者都有，带 from 则是从文件中读取规则。

脚本内容：

``` bash
#!/system/bin/env bash

set -xe

if pidof -o %PPID -s "syncone"; then
    exit 1
fi

LANG=en_US.UTF-8
TZ=Asia/Shanghai

# rclone 执行文件路径，这里用的 termux 的
export RCLONE=/data/data/com.termux/files/usr/bin/rclone

# 本地备份根目录，比如要备份 /sdcard/a 和 /sdcard/b 就填 /sdcard 即可
export SOURCE=/sdcard

# 远程名
export REMOTE_NAME=love

# 远程文件夹
export REMOTE_DIR=/snapshot

export RCLONE_UPDATE=true
export RCLONE_FAST_LIST=true
export RCLONE_CHECKSUM=true
export RCLONE_IGNORE_ERRORS=true
export RCLONE_TRACK_RENAMES=true
export RCLONE_NO_UPDATE_MODTIME=true
export RCLONE_TRANSFERS=10

# 日志
export RCLONE_LOG_LEVEL=INFO
#export RCLONE_SYSLOG=true
export RCLONE_LOG_FILE=/sdcard/rclone.log

# 旧文件存放路径，必须是同一个远程，此处是备份到远程名为 $REMOTE_NAME 的 archive 目录下，并以 年/日期时间 为目录名进行区分，文件名不变。
#export RCLONE_BACKUP_DIR="$REMOTE_NAME:/archive/$(date +%Y)/$(date +%F_%R)"

# 与上面功能相同，区别是所有文件路径不变，以文件名加日期时间后缀进行区分
export RCLONE_BACKUP_DIR="${REMOTE_NAME}:/old_files"
export RCLONE_SUFFIX="_$(date +%Y-%m-%d_%H%M%S)"
export RCLONE_SUFFIX_KEEP_EXTENSION=true

# 过滤规则文件
export RCLONE_FILTER_FROM=/sdcard/ADM/Scripts/rclone-filters.txt

# 清空日志
#:>${RCLONE_LOG_FILE}

# 检测网络链接
# 超时时间
timeout=5

# 目标网站
target=www.baidu.com

# 获取响应状态码
ret_code=`curl -I -s --connect-timeout $timeout $target -w %{http_code} | tail -n1`

if [ "${ret_code}" = "200" ]; then
    termux-tools termux-tts-speak "网络连接正常,开始备份！"
    echo "网络连接正常,开始备份！"

    ${RCLONE} sync ${SOURCE} ${REMOTE_NAME}:${REMOTE_DIR}

    termux-tools termux-tts-speak "rclone 备份完成！"
    echo "备份完成！"

else
    termux-tools termux-tts-speak "网络连接异常，停止备份！"
    echo "网络连接异常，停止备份！"
fi
```

如果没有安装　bash 需要把第一行的　bash 换成　sh，另外　termux-tools 是我封装的　Termux-API 的功能，需要安装　Termux 和 Termux-API，并把　termux-tools 文件放在系统　PATH　中（/system/bin 或 /system/xbin，或则指定文件路径），如果没有可以注释掉。

termux-tools　文件内容:

``` bash
#!/system/xbin/bash
export LD_LIBRARY_PATH=/data/data/com.termux/files/usr/lib
export PATH=/data/data/com.termux/files/usr/bin:/data/data/com.termux/files/usr/bin/applets

case $1 in
    termux-tts-speak)
        termux-tts-speak ${@:2}
        ;;
    termux-toast)
        termux-toast ${@:2}
        ;;
    termux-wallpaper)
        termux-wallpaper ${@:2}
        ;;
esac
```

过滤规则文件 rclone-filters.txt 内容

``` diff
- *.bak
- /ADM/.config/EntWare/**

+ /.fooView/**
+ /ADM/**
+ /baidu/**
+ /MyAndroidTools/**
+ /Pictures/**
+ /ViPER4Android/**
+ /Xposed_Edge_Icon/**
+ /YueDu/**
+ /YueDu3.0/**
+ /习/**

- *
```

每行一个，减号 `-` 代表排除，加号 `+` 代表包含，`/` 为根目录，即脚本中 `${SOURCE}` 指定的目录，如果使用了包含规则需在最后一行添加 `- *` , \* 匹配所有目录，不包含子目录，** 匹配所有目录包扩子目录。

规则具体怎么用可以去官网查看　[Rclone Filter](https://rclone.org/filtering/)。

## 定时任务

光有备份脚步还不行，还得有定时任务来定时执行备份任务，毕竟每天手动执行备份也太麻烦了。定时任务我用的 Linux 比较常用的 crontable, Android 默认是没有的，但是可以安装 busybox 使用　busybox　的，而我所用的 ROOT 权限管理软件 Magisk 刚好自带了 busybox　可以直接使用。使用 contable 需要先启动其守护程序 crond，可以利用 Magisk 的功能，在 /data/adb/service.d　目录创建个文件，填入以下内容（也可以放在已安装模块的　service.sh 文件中）

``` bash
#!/system/bin/sh
# Do NOT assume where your module will be located.
# ALWAYS use $MODDIR if you need to know where this script
# and module is placed.
# This will make sure your module will still work
# if Magisk change its mount point in the future
MODDIR=${0%/*}

while [[ ! -d "/sdcard/Android" ]]
do
    sleep 10
done

# run crond daemon
crond -L /sdcard/crontabs/crond.log -c /sdcard/crontabs
```

然后去手机内置存储创建　crontabs 文件夹，在 crontabs　目录创建个 root 文件在里面填写即可。我设置的是每天晚上十点执行一次备份，内容如下

``` crontab
10 22 * * * bash /sdcard/ADM/Scripts/syncone >/dev/null 2>&1
```

除了使用 crontab　外还可以使用其它有定时执行 shell 功能的应用定时执行备份脚本即可，如 Tasker、fooView、Xposed edge 等。
