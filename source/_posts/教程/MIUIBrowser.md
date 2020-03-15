---
title: 小米浏览器去广告、隐私保护增强
tags: MIUI
abbrlink: b788c5ea
date: 2019-10-16 14:20:06
---
<img src="https://i.loli.net/2019/10/16/jronISYk9gXcUxN.jpg" width="500"/>
<!--more-->

<details>
<summary>点击显示更新信息</summary>

{% note success %}
### 2019.3.14 更新
1. 当官方规则 API 返回空数据时跳过添加官方规则
2. 添加显示单个订阅规则调试（可能有误差）以及添加进度
3. 使用 [YUX-IO/ffp](https://github.com/YUX-IO/ffp) 的 demo 服务 <https://ffp.yux.io/> 代理下载规则，加速规则下载。（代理无法使用时会回退使用原地址）
4. 增加自动替换、防覆盖功能（防覆盖需要 chattr 命令支持，magisk 用户可以将 `/sbin/.magisk/busybox/chattr` 链接到 `/system/xbin/chattr`）
5. 添加 github gist 地址。

<details>
<summary>点击显示 Gist</summary>
{% gist f720d18d00cb8f46206d4b4f109c5b7f ad.py %}
</details>

{% endnote %}

</details>


一直以来我都是把自带浏览器删除用 via 替换的，但 MIUI 在某个版本升级后如果卸载了自带浏览器会导致快应用闪退，刚好 MIUI 浏览器更新了简洁模式界面还不错，就决定用回自带浏览器了。

当然即便是启用简洁模式也还是有很多不好的地方，比如菜单栏的广告、搜索栏热点推荐、无法自定义搜索引擎等等。习惯性去数据目录看看，发现了对应的配置文件，既然是需要从本地读取那就好办了，直接把文件内容清空去掉读写权限，设置不可更该属性就好。

MIUI 浏览器的去广告功能还是很强的，规则文件存储在 `/data/data/com.android.browser/files/data/adblock/` 目录下，其中 `miui_blacklist.json` 就是规则文件了，打开看可以看到存储规则是这样的

``` json
{
    'effectiveTime': int(time.time() * 1000),
    'flag': 0,
    'id': id,
    'network': 255,
    'rule': line,
    'updatetime': int(time.time() * 1000)
}
```

其中最重要的就是 rule 项，由于文件过大，内容还都是压缩的，我就没仔细看了，直接试着将 PC 上的去广告规则添加进去，经测试是有效的，所以最终有了这篇文章。

既然知道可以使用 PC 上的 ABP 规则，那么接下来就是将 ABP 的规则添加到 MIUI 自带规则中去，这里我选择使用 Python 来处理。从前面我们知道了一条规则的内容，接下来就很好办了，先将自带的规则导入，然后遍历 ABP 规则，把除头部及注释的内容，按上面的格式拼接，其中 effectiveTime 和 updatetime 均为距 1970 年的秒数（自带规则里这两个的值是不一样的，这里为了方便使用同一个值），使用 time 模块的 time 获取毫秒数将其乘以 1000 取整即可，然后 append 到自带规则中即可，最后再 dump 到文件中。至此就大功告成了。

另外还有个白名单文件，建议把它清空。

代码：

``` python
import json
import time
import zipfile
import tempfile
from urllib import request

miui_api = 'https://api.browser.miui.com/bsr/adRuleBlock/miuiadblock'
sub_urls = ['https://easylist-downloads.adblockplus.org/easylistchina.txt',
            'https://easylist-downloads.adblockplus.org/easyprivacy.txt',
            'https://easylist-downloads.adblockplus.org/easylist.txt',
            'https://raw.githubusercontent.com/xinggsf/Adblock-Plus-Rule/master/ABP-FX.txt',
            'https://raw.githubusercontent.com/cjx82630/cjxlist/master/cjx-annoyance.txt',
            'http://tools.yiclear.com/ChinaList2.0.txt'
            ]

print("正在从 MIUI API 获取数据下载地址")
req = request.Request(miui_api)
res = request.urlopen(req).read().decode('utf-8')
print("地址获取成功")

res = json.loads(res)
tmpdir = tempfile.mkdtemp()
print("正在下载压缩包")
req = request.Request(res['miuiadblock']['download_url'])
res = request.urlopen(req).read()
tmpfile = tmpdir + '/' + 'tmp.zip'
with open(tmpfile, 'wb') as f:
    f.write(res)
print("压缩包下载完成，开始解压")
file_zip = zipfile.ZipFile(tmpfile, 'r')
file_zip.extractall(tmpdir)
print("解压完成，开始数据合并")
print('*'*50)
miui_blacklist = tmpdir + '/' + 'blacklist.json'
default = json.load(open(miui_blacklist, 'r'))

id = 66666
for url in sub_urls:
    filename = url.split('/')[-1]
    req = request.Request(url)
    while(True):
        try:
            print("正在下载 %s" % filename)
            res = request.urlopen(req).read().decode('utf-8')
            if(res):
                print("开始添加 %s" % filename)
                for line in res.split('\n'):
                    if(not (line.startswith('[') or line.startswith('!'))):
                        data = {
                            'effectiveTime': int(time.time() * 1000),
                            'flag': 0,
                            'id': id,
                            'network': 255,
                            'rule': line,
                            'updatetime': int(time.time() * 1000)
                        }
                        default['data'].append(data)
                        id += 1
                print("%s 添加完成" % filename)
                break
        except Exception as err:
            print(err)
            print('sleep 3s')
            time.sleep(3)
json.dump(default, open('miui_blacklist_opt.json', 'w'))

```

最后再分享个去除 QQ 自定义字体、礼物特效;修改 MIUI 浏览器搜索引擎;去除 X5、TBS 内核 的 shell 脚本 

<details>
<summary>点击显示 Gist</summary>
{% gist e4f2315dc29b89fd5d7d569c2b4f3ee9 Pure.sh %}
</details>