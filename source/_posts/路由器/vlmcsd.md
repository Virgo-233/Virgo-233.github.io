---
title: KMS
tags:
  - OpenWrt
  - Office
  - Windows
abbrlink: 343b8a35
categories: []
date: 2018-06-06 21:11:44
---
![KMS](https://i.loli.net/2019/06/08/5cfb5cd807c3728109.jpg)
<!--more-->
路由器上搭建了一个 KMS 服务器，测试了下可以使用。我本人用的数字许可证激活的，不需要 KMS 但弄都弄好了，就发出来算了。算是留个备份。(服务器是搭建在寝室路由器上的，并未进行穿透，因而只能在学校内使用。只要学校网络不出问题，应该都能正常使用，可用 ping 命令测试，如果连不上可能正在重启或是更新固件) ps:因学校网络原因 IP 可能会变化。

注意：仅 Windows Vista 及以上系统可以使用 KMS 激活，且 Windows7 旗舰版 不支持 KMS 激活。
KMS 激活也需要密钥，且不同版本对应不同密钥。不过这个密钥可以在微软官网找到。
此处以 windows 10 专业版为例，其密钥为：W269N-WFGWX-YVC9B-4J6C9-T83GX
其他版本也可在微软官网找到。

Windows KMS 密钥 <https://technet.microsoft.com/en-us/library/jj612867(v=ws.11).aspx>
Office KMS 密钥 <https://technet.microsoft.com/en-us/library/dn385360(v=office.16).aspx>

- 激活 windows 10 专业版
    右键开始菜单，点击命令提示符（管理员）或者 Windows PowerShell （管理员)
    输入 `slmgr /upk` 卸载原有密钥，如果是刚装好的系统，这一步可以省略。
    输入 `slmgr /skms 172.30.192.89` 设置 KMS 服务器地址。
    输入 `slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX` 安装 KMS 密钥
    输入 `slmgr /ato` 查看激活状态，如果显示 “成功地激活了产品”，表示激活成功，
    每隔 180 天会自动续订，不需要担心激活过期。
    ![Windows_KMS](https://i.loli.net/2019/06/08/5cfb5cfb264eb24023.jpg)
- 激活 Office 2016
    右键开始菜单，点击命令提示符（管理员）或者 Windows PowerShell （管理员)
    输入 `cd "C:\Program Files (x86)\Microsoft Office\Office16"` 这个是 Office 激活脚本所在位置，不同的 Office 版本不一样，比如 Office 2013 是 `cd "C:\Program Files (x86)\Microsoft Office\Office15"`。
    输入 `cscript ospp.vbs /sethst:172.30.192.89` 将激活服务器地址设为 172.30.192.89。
    输入 `cscript ospp.vbs /act` 激活 office。
