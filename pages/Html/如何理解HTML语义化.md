- 让人更容易读懂（增加代码可读性）
- 让搜索引擎更容易读懂（SEO）

### header元素

`header` 元素代表“网页”或“section”的页眉。

```html
<header>
    <hgroup>
        <h1>网站标题</h1>
        <h1>网站副标题</h1>
    </hgroup>
</header>
```
### footer元素

`footer` 元素代表“网页”或“section”的页脚，通常含有该节的一些基本信息，譬如：作者，相关文档链接，版权资料。如果footer元素包含了整个节，那么它们就代表附录，索引，提拔，许可协议，标签，类别等一些其他类似信息。

```html
<footer>
    COPYRIGHT
</footer>
```

### hgroup元素

`hgroup` 元素代表“网页”或“section”的标题，当元素有多个层级时，该元素可以将h1到h6元素放在其内，譬如文章的主标题和副标题的组合

```html
<hgroup>
    <h1>这是一篇介绍HTML 5语义化标签和更简洁的结构</h1>
    <h2>HTML 5</h2>
</hgroup>
```

### nav元素

nav元素代表页面的导航链接区域。用于定义页面的主要导航部分。

```html
<nav>
    <ul>
        <li>HTML 5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
    </ul>
</nav>
```

### aside元素

`aside` 元素被包含在article元素中作为主要内容的附属信息部分，其中的内容可以是与当前文章有关的相关资料、标签、名次解释等。（特殊的section）

在article元素之外使用作为页面或站点全局的附属信息部分。最典型的是侧边栏，其中的内容可以是日志串连，其他组的导航，甚至广告，这些内容相关的页面。

```html
<article>
    <p>内容</p>
    <aside>
        <h1>作者简介</h1>
        <p>前端一枚</p>
    </aside>
</article>
```

### section元素
`section` 元素代表文档中的“节”或“段”，“段”可以是指一篇文章里按照主题的分段；“节”可以是指一个页面里的分组。

```html
<section>
    <h1>section是啥？</h1>
    <article>
        <h2>关于section</h1>
        <p>section的介绍</p>
        <section>
            <h3>关于其他</h3>
            <p>关于其他section的介绍</p>
        </section>
    </article>
</section>
```

### article元素

`article` 代表一个在文档，页面或者网站中自成一体的内容，其目的是为了让开发者独立开发或重用。譬如论坛的帖子，博客上的文章，一篇用户的评论，一个互动的widget小工具。（特殊的section）

```html
<article>
    <h1>一篇文章</h1>
    <p>文章内容..</p>
    <footer>
        <p><small>版权：html5jscss网所属</small></p>
    </footer>
</article>
```