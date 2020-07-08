---
title: VS Code 配置 C 和 C++ 环境
abbrlink: d5ae7f1b
date: 2018-09-18 22:18:05
tags: Windows
---
Visual Studio Code (简称 VS Code/VSC)是一款免费开源的代码编辑器，支持几乎所有的主流开发语言，有语法高亮、智能代码补全、自定义热键、符号自动补全、代码片段、代码对比 Diff、GIT 等特性，支持插件扩展。软件支持 Windows、Mac 以及 Linux。

官网：<https://code.visualstudio.com/>
![vscode](https://cdn.jsdelivr.net/gh/cxyzzz/CDN@20.07.08/images/posts/5cfb5b61c8e8413483.webp)
<!-- more -->

## 环境准备

VS Code 可在官网下载，其只是一个编辑器并不是 IDE，不含编译器因而需要我们自己安装编译器。
编译器我选的是 GCC/G++ 配合 clang 使用，Windows 也可选 MSVC ，Mac 可选 clang 。以 Windows 为例。需去下载 MinGW-w64 和 LLVM 。

- LLVM Download Page: <http://releases.llvm.org/download.html> 选Pre-Built Binaries中的Clang for Windows (64-bit)，不需要下.sig文件.
- MinGW-w64: <https://sourceforge.net/projects/mingw-w64/> 直接点 Download 即可。

下载好后安装，添加环境变量时选第二项，安装位置选个你能找到的，后面会用到。
![llvm](https://i.loli.net/2019/06/08/5cfb5b33bb73768144.jpg)

安装完了以后可能会弹出 cmd 说 MSVC integration install failed。这个是因为 Clang 默认使用的是 msvc 的工具链，而我们选择的工具链是 MinGW，所以就不用管这个提示。

MinGW随便装哪，Architecture 选 x86_64，装好以后把东西全部复制到 Clang的文件夹里去，他们会无冲突合并。同样，不做这一步也行，下面的配置里路径就自己改，还要手动把 MinGW 的 bin 文件夹加到 path 中，因为MinGW 不会自己加。至于为什么既要装 Clang 又要装 MinGW，是因为 Clang 没有头文件。然后就可以把 MinGW 删了（Uninstall.exe）。不建议安装多个MinGW，如果你安装了其他 IDE 需要注意把其他的 MinGW 从环境变量中去掉；也可以自己把他们的编译器设为 Clang。因为几乎所有的轻量级 IDE 用的都是MinGW 或 TDM-GCC，它们不制造编译器，只是打包了一个。ps:MinGW 安装时需要在线下载，可能需要科学上网。

弄好后可打开 CMD 输入 clang -v 和 gcc -v 应该显示图中内容（版本号不同没事）。如果没有显示就是环境没配置好，可以手动添加到 path （如何配置请自行百度），也可重复上面的操作。
![test](https://i.loli.net/2019/06/08/5cfb5b33e542735446.jpg)

## 配置 VS Code

### 安装扩展

需要安装的扩展：

- `C/C++`
- `C/C++ Clang Command Adapter` 提供静态检测（Lint），很重要。
- `Code Runner` 添加右键编译运行代码，支持大多数语言。

附：我的插件列表

- `background` 修改 VS Code 背景
- `Bracket Pair Colorizer` 彩色花括号
- `C/C++ Snippets` 代码片段
- `Code Speel Checker` 规范命名用
- `filesize` 在左下角显示文件大小
- `Include Autocomplete` 提供头文件名字的补全
- `One Dark Pro` VS Code 主题
- `Setting Sync` 同步 VS Code 扩展、设置、代码片段到 GitHub Gist。
- `VSCode Great Icons` VS Code 文件夹图标

### 配置四个 json 文件

先新建一个用来存放代码的文件夹（工作区)，路径不能包含中文、空格和引号。打开 VS Code 选打开文件夹，选择刚刚创建的文件夹，点击 VS Code 的新建文件夹创建 .vscode 文件夹。（这么做是因为 Windows 资源管理器不允许创建 . 开头的文件夹），然后分别创建 c_cpp_properties.json 、launch.json 、tasks.json 和 settings.json。

#### 配置 c_cpp_properties.json

<details>
<summary>点击查看文件详细信息</summary>

```json
{
    "configurations": [
        {
            "name": "Win32",
            "intelliSenseMode": "clang-x64",
            "includePath": [
                "${workspaceFolder}",
                "C:/Program Files/Program Files/LLVM/lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++",
                "C:/Program Files/Program Files/LLVM/lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++/x86_64-w64-mingw32",
                "C:/Program Files/Program Files/LLVM/lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++/backward",
                "C:/Program Files/LLVM/lib/gcc/x86_64-w64-mingw32/8.1.0/include",
                "C:/Program Files/LLVM/include",
                "C:/Program Files/LLVM/x86_64-w64-mingw32/include",
                "C:/Program Files/LLVM/lib/gcc/x86_64-w64-mingw32/8.1.0/include-fixed",
                "C:/Program Files/LLVM/lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++",
                "C:/Program Files/LLVM/lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++/tr1"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "__GNUC__=7",
                "__cdecl=__attribute__((__cdecl__))"
            ],
            "browse": {
                "path": [
                    "${workspaceFolder}",
                    "C:/Program Files/LLVM/lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++",
                    "C:/Program Files/LLVM/lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++/x86_64-w64-mingw32",
                    "C:/Program Files/LLVM/lib/gcc/x86_64-w64-mingw32/8.1.0/include/c++/backward",
                    "C:/Program Files/LLVM/lib/gcc/x86_64-w64-mingw32/8.1.0/include",
                    "C:/Program Files/LLVM/include",
                    "C:/Program Files/LLVM/x86_64-w64-mingw32/include",
                    "C:/Program Files/LLVM/lib/gcc/x86_64-w64-mingw32/8.1.0/include-fixed"
                ],
                "limitSymbolsToIncludedHeaders": true,
                "databaseFilename": ""
            },
            "compilerPath": "C:\\Program Files\\LLVM\\bin\\gcc.exe",
            "cStandard": "c11",
            "cppStandard": "c++17"
        }
    ],
    "version": 4
}
```
</details>

可参考 [Microsoft/vscode-cpptools](https://github.com/Microsoft/vscode-cpptools/blob/master/Documentation/LanguageServer/MinGW.md) 如果没有合并 LLVM 和 MinGW 则 compilerPath 需要改成 MinGW gcc.exe 的路径。Windows 的路径是反斜杠需要使用两个反斜杠来转义，直接使用斜杠也行。includePath 和 browse 中的 path 均为头文件所在路径。ps:偶尔可能会出现提示找不到头文件但能正常编译运行。

#### 配置 launch.json

<details>
<summary>点击查看文件详细信息</summary>

```json
// https://github.com/Microsoft/vscode-cpptools/blob/master/launch.md
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "C Launch", //C 语言调试配置名称
            "type": "cppdbg", // 配置类型，这里只能为cppdbg
            "request": "launch", // 请求配置类型，可以为launch（启动）或attach（附加）
            "program": "${fileDirname}/${fileBasenameNoExtension}.exe", // 将要进行调试的程序的路径
            "args": [], // 程序调试时传递给程序的命令行参数，一般设为空即可
            "stopAtEntry": false, // 设为true时程序将暂停在程序入口处
            "cwd": "${workspaceFolder}", // 调试程序时的工作目录
            "environment": [], // （环境变量？）
            "externalConsole": true, // 调试时是否显示控制台窗口，一般设置为true显示控制台
            "internalConsoleOptions": "neverOpen", // 如果不设为neverOpen，调试时会跳到“调试控制台”选项卡，你应该不需要对gdb手动输命令吧？
            "MIMode": "gdb", // 指定连接的调试器，可以为gdb或lldb。但目前lldb在windows下没有预编译好的版本。
            "miDebuggerPath": "C:/Program Files/LLVM/bin/gdb.exe", // 调试器路径。
            "setupCommands": [
                    {
                        "description": "Enable pretty-printing for gdb",
                        "text": "-enable-pretty-printing",
                        "ignoreFailures": true
                    }
                ],
            "preLaunchTask": "CCompile", // 调试会话开始前执行的任务，一般为编译程序。与tasks.json的label相对应
        },

        {
            "name": "C++ Launch", // C++ 调试配置名称
            "type": "cppdbg", // 配置类型，这里只能为cppdbg
            "request": "launch", // 请求配置类型，可以为launch（启动）或attach（附加）
            "program": "${fileDirname}/${fileBasenameNoExtension}.exe", // 将要进行调试的程序的路径
            "args": [], // 程序调试时传递给程序的命令行参数，一般设为空即可
            "stopAtEntry": false, // 设为true时程序将暂停在程序入口处
            "cwd": "${workspaceFolder}", // 调试程序时的工作目录
            "environment": [], // （环境变量？）
            "externalConsole": true, // 调试时是否显示控制台窗口，一般设置为true显示控制台
            "internalConsoleOptions": "neverOpen", // 如果不设为neverOpen，调试时会跳到“调试控制台”选项卡
            "MIMode": "gdb", // 指定连接的调试器
            "miDebuggerPath": "C:/Program Files/LLVM/bin/gdb.exe", // 调试器路径。
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": false
                }
            ],
            "preLaunchTask": "C++Compile" // 调试会话开始前执行的任务，一般为编译程序。与tasks.json的label相对应
        }
    ]
}
```

</details>

#### 配置 tasks.json

<details>
<summary>点击查看文件详细信息</summary>

```json
// https://code.visualstudio.com/docs/editor/tasks
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "CCompile", // 任务名称，与launch.json的preLaunchTask相对应
            "command": "clang", // 要使用的编译器
            "args": [
                "${file}",
                "-o", // 指定输出文件名，不加该参数则默认输出a.exe
                "${fileDirname}/${fileBasenameNoExtension}.exe",
                "-g", // 生成和调试有关的信息
                "-Wall", // 开启额外警告
                "-static-libgcc", // 静态链接
                "-fcolor-diagnostics",
                "--target=x86_64-w64-mingw", // 默认target为msvc，不加这一条就会找不到头文件
                "-std=c11"
            ], // 编译命令参数
            "type": "shell",
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "never", // 在“终端”中显示编译信息的策略，可以为always，silent，never。具体参见VSC的文档
                "focus": false,
                "panel": "shared" // 不同的文件的编译信息共享一个终端面板
            }
        },
        {
            "label": "C++Compile", // 任务名称，与launch.json的preLaunchTask相对应
            "command": "clang++", // 要使用的编译器
            "args": [
                "${file}",
                "-o", // 指定输出文件名，不加该参数则默认输出a.exe
                "${fileDirname}/${fileBasenameNoExtension}.exe",
                "-g", // 生成和调试有关的信息
                "-Wall", // 开启额外警告
                "-static-libgcc", // 静态链接
                "-fcolor-diagnostics",
                "--target=x86_64-w64-mingw", // 默认target为msvc，不加这一条就会找不到头文件
                "-std=c++17"
            ], // 编译命令参数
            "type": "shell",
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "never", // 在“终端”中显示编译信息的策略，可以为always，silent，never。具体参见VSC的文档
                "focus": false, // 设为true后可以使执行task时焦点聚集在终端，但对编译c和c++来说，设为true没有意义
                "panel": "shared" // 不同的文件的编译信息共享一个终端面板
            }
            // "problemMatcher":"$gcc" // 如果你不使用clang，去掉前面的注释符，并在上一条之后加个逗号。)
        }
    ]
}
```

</details>

#### 配置 settings.json

<details>
<summary>点击查看文件详细信息</summary>

```json
{
    "code-runner.runInTerminal": true, // 设置成false会在“输出”中输出，无法交互
    "code-runner.executorMap": {
        "c": "cd $dir && clang $fileName -o $fileNameWithoutExt.exe -Wall -g -Og -static-libgcc -fcolor-diagnostics --target=x86_64-w64-mingw -std=c11 && $dir$fileNameWithoutExt",
        "cpp": "cd $dir && clang++ $fileName -o $fileNameWithoutExt.exe -Wall -g -Og -static-libgcc -fcolor-diagnostics --target=x86_64-w64-mingw -std=c++17 && $dir$fileNameWithoutExt"
    }, // 设置code runner的命令行
    "code-runner.saveFileBeforeRun": true, // run code前保存
    "code-runner.preserveFocus": true, // 若为false，run code后光标会聚焦到终端上。如果需要频繁输入数据可设为false
    "code-runner.clearPreviousOutput": false, // 每次run code前清空属于code runner的终端消息

    "C_Cpp.clang_format_sortIncludes": true, // 格式化时调整include的顺序（按字母排序）
    "C_Cpp.intelliSenseEngine": "Default", // 可以为Default或Tag Parser，后者较老，功能较简单。具体差别参考cpptools插件文档
    "C_Cpp.errorSquiggles": "Disabled", // 因为有clang的lint，所以关掉
    "editor.formatOnType": true, // 输入时就进行格式化，默认触发字符较少，分号可以触发
    "editor.snippetSuggestions": "top", // snippets代码优先显示补全

    "clang.cflags": [ // 控制c语言静态检测的参数
        "--target=x86_64-w64-mingw",
        "-std=c11",
        "-Wall"
    ],
    "clang.cxxflags": [ // 控制c++静态检测时的参数
        "--target=x86_64-w64-mingw",
        "-std=c++17",
        "-Wall"
    ],
    "files.associations": {
        "iostream": "cpp",
        "iomanip": "cpp",
        "array": "cpp",
        "string_view": "cpp",
        "random": "cpp",
        "ostream": "cpp",
        "atomic": "cpp",
        "*.tcc": "cpp",
        "cctype": "cpp",
        "chrono": "cpp",
        "clocale": "cpp",
        "cmath": "cpp",
        "complex": "cpp",
        "condition_variable": "cpp",
        "cstdint": "cpp",
        "cstdio": "cpp",
        "cstdlib": "cpp",
        "cstring": "cpp",
        "ctime": "cpp",
        "cwchar": "cpp",
        "cwctype": "cpp",
        "exception": "cpp",
        "fstream": "cpp",
        "initializer_list": "cpp",
        "iosfwd": "cpp",
        "istream": "cpp",
        "limits": "cpp",
        "memory": "cpp",
        "mutex": "cpp",
        "new": "cpp",
        "numeric": "cpp",
        "ratio": "cpp",
        "sstream": "cpp",
        "stdexcept": "cpp",
        "streambuf": "cpp",
        "system_error": "cpp",
        "thread": "cpp",
        "tuple": "cpp",
        "type_traits": "cpp",
        "typeinfo": "cpp",
        "utility": "cpp"
    },
    "cSpell.language": "en",
    "clang.completion.enable":true // 效果稍好，如果卡，可关掉
}
```

</details>

建议放置在工作区设置。

另附个人设置：
<details>
<summary>点击查看文件详细信息</summary>

```json
{
    "editor.fontFamily": "Consolas, 微软雅黑", // 控制编辑器字体
    "workbench.colorTheme": "One Dark Pro", // 主题
    "files.trimTrailingWhitespace": true,
    "sync.gist": "xxxxxxxxxxxxxxxxxxxxx", //settings sync gist
    "sync.lastUpload": "2018-06-24T05:40:57.167Z",
    "sync.forceDownload": false,
    "sync.askGistName": false,
    "sync.removeExtensions": true,
    "sync.syncExtensions": true,
    "workbench.iconTheme": "vscode-great-icons", // 文件夹图标
    "files.autoSave": "afterDelay", // 自动保存方式
    "files.autoSaveDelay": 120000, // 自动保存延迟
    "editor.dragAndDrop": false, // 选中文字后，可以拖动它们调整位置
    "explorer.confirmDragAndDrop": false,
    "explorer.confirmDelete": false,
    "files.autoGuessEncoding": true, // 自动检测文件编码
    "sync.autoDownload": false, // 自动下载备份
    "sync.autoUpload": false, //自动上传备份
    "sync.lastDownload": "",
    "sync.host": "",
    "sync.pathPrefix": "",
    "sync.quietSync": false,
    "cSpell.language": "en",
    "editor.multiCursorModifier": "ctrlCmd",
    "git.ignoreMissingGitWarning": true,
}
```

</details>

### 开始写代码

新建一个文件，后缀视语言而定，C 语言为 .c (使用 .cpp 也能运行，但不建议)，C++ 为 .cpp。点击上部分 终端-运行生成任务 （Ctrl + Shift + B)进行编译,Ctrl + F5 只运行。也可按 F5 启用调试。

## 总结

VS Code 本身只是个文本编辑器，其他功能都是靠扩展实现的。要实现某个功能必须进行配置才能使用。VS Code 本身颜值很高，相比于 VS 动辄几 G 来说体积也不是很大，运行过程中占用的内存也不多且支持大多数语言。

参考链接:

- <https://www.zhihu.com/question/30315894>
- <https://blog.csdn.net/u013322949/article/details/60339735>
