# Markdown to Word 转换器

这个脚本可以将Mojo GoGo项目的Markdown章节转换为Word文档。

## 功能特性

- 自动转换Markdown格式为Word文档
- 保持标题层级结构
- **支持Markdown和HTML格式的图片**
- **自动清理所有HTML标签**
- 处理图片、链接、列表、代码块、引用等格式
- 自动设置页面边距和格式
- 每个主标题自动分页

## 安装依赖

```bash
pip install -r requirements.txt
```

## 使用方法

1. 确保你的项目结构如下：
```
mojo-mdbook/
├── src/
│   └── chapters/
│       ├── user-guide.md
│       ├── roam-points.md
│       ├── create-bot.md
│       └── earn-points.md
├── generate_word_docs.py
└── requirements.txt
```

2. 运行转换脚本：
```bash
python generate_word_docs.py
```

3. 转换完成后，Word文档将保存在 `word_documents/` 目录中

## 输出文件

转换完成后，你将得到以下Word文档：

- `user-guide.docx` - 用户指南 (包含2张图片)
- `roam-points.docx` - Roam积分说明 (包含7张图片)
- `create-bot.docx` - 创建和编辑机器人 (包含14张图片)
- `earn-points.docx` - 赚取积分指南 (包含11张图片)

## 图片支持

脚本支持两种图片格式：

1. **Markdown格式**: `![alt文本](图片路径)`
2. **HTML格式**: `<img src="图片路径" alt="alt文本">`

图片会自动嵌入到Word文档中，并添加说明文字。

## HTML标签清理

脚本会自动清理以下HTML标签，确保生成的Word文档干净整洁：

- `<div>`, `</div>`
- `<span>`, `</span>`
- `<p>`, `</p>`
- `<br>`, `<br/>`
- `<strong>`, `</strong>`
- `<em>`, `</em>`
- `<a href>`, `</a>`

## 注意事项

- 确保所有引用的图片文件存在于正确的路径中
- 脚本会自动跳过CSS样式块
- 如果图片文件不存在，会在文档中添加占位符说明
- 每个主标题都会自动分页
- 图片宽度自动调整为5英寸，保持文档美观
- **所有HTML标签都会被自动清理**

## 故障排除

如果遇到问题：

1. 检查Python版本（建议3.7+）
2. 确认已安装所有依赖包
3. 检查文件路径是否正确
4. 查看控制台输出的错误信息

## 自定义

你可以修改 `generate_word_docs.py` 中的 `chapters` 列表来添加或移除要转换的章节。

## 转换结果

✅ **已成功转换所有章节**
✅ **所有图片已正确嵌入**
✅ **所有HTML标签已清理**
✅ **保持原始格式和结构**
✅ **自动分页和排版**
✅ **文档干净整洁，无HTML残留**
