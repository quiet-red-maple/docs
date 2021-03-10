URL 重定向，也称为 URL 转发，是一种当实际资源，如单个页面、表单或者整个 Web 应用被迁移到新的 URL 下的时候，保持（原有）链接可用的技术。HTTP 协议提供了一种特殊形式的响应—— HTTP 重定向（HTTP redirects）来执行此类操作。

### 1、HTTP 协议中重定向机制

不同类型的重定向映射可以划分为三个类别：

1. 永久重定向
2. 临时重定向
3. 特殊重定向

#### 永久重定向

这种重定向操作是永久性的。它表示原 URL 不应再被使用，而应该优先选用新的 URL。搜索引擎机器人会在遇到该状态码时触发更新操作，在其索引库中修改与该资源相关的 URL 。

| 编码  | 含义               | 处理方法                                                     | 典型应用场景                                             |
| :---- | :----------------- | :----------------------------------------------------------- | :------------------------------------------------------- |
| `301` | Moved Permanently  | [`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) 方法不会发生变更，其他方法有可能会变更为 [`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) 方法。[[1\]](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Redirections#attr1) | 网站重构。                                               |
| `308` | Permanent Redirect | 方法和消息主体都不发生变化。                                 | 网站重构，用于非GET方法。(with non-GET links/operations) |

[1] 该规范无意使方法发生改变，但在实际应用中用户代理会这么做。 308 状态码被创建用来消除在使用非 GET 方法时的歧义行为。

#### 临时重定向

有时候请求的资源无法从其标准地址访问，但是却可以从另外的地方访问。在这种情况下可以使用临时重定向。

搜索引擎不会记录该新的、临时的链接。在创建、更新或者删除资源的时候，临时重定向也可以用于显示临时性的进度页面。

| 编码  | 含义                 | 处理方法                                                     | 典型应用场景                                                 |
| :---- | :------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `302` | `Found`              | [`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) 方法不会发生变更，其他方法有可能会变更为 [`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) 方法。[[2\]](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Redirections#attr2) | 由于不可预见的原因该页面暂不可用。在这种情况下，搜索引擎不会更新它们的链接。 |
| `303` | `See Other`          | [`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) 方法不会发生变更，其他方法会**变更**为 GET 方法（消息主体会丢失）。 | 用于[`PUT`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/PUT) 或 [`POST`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST) 请求完成之后进行页面跳转来防止由于页面刷新导致的操作的重复触发。 |
| `307` | `Temporary Redirect` | 方法和消息主体都不发生变化。                                 | 由于不可预见的原因该页面暂不可用。在这种情况下，搜索引擎不会更新它们的链接。当站点支持非 GET 方法的链接或操作的时候，该状态码优于 302 状态码。 |

[2] 该规范无意使方法发生改变，但在实际应用中用户代理会这么做。 307 状态码被创建用来消除在使用非 GET 方法时的歧义行为。

#### 特殊重定向

除了上述两种常见的重定向之外，还有两种特殊的重定向。[`304`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/304) （Not Modified，资源未被修改）会使页面跳转到本地陈旧的缓存版本当中（该缓存已过期(?)），而 [`300`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/300) （Multiple Choice，多项选择） 则是一种手工重定向：以 Web 页面形式呈现在浏览器中的消息主体包含了一个可能的重定向链接的列表，用户可以从中进行选择。

| 编码  | 含义              | 典型应用场景                                                 |
| :---- | :---------------- | :----------------------------------------------------------- |
| `300` | `Multiple Choice` | 不常用：所有的选项在消息主体的 HTML 页面中列出。鼓励在 [`Link`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Link) 头部加入机器可读的 `rel=alternate` |
| `304` | `Not Modified`    | 发送用于重新验证的条件请求。表示缓存的响应仍然是新鲜的并且可以使用。 |

###  

### 2、HTML 重定向机制

```html
<head> 
  <meta http-equiv="Refresh" content="0; URL=http://example.com/" />
</head>
```

`content` 属性的值开头是一个数字，指示浏览器在等待该数字表示的秒数之后再进行跳转。建议始终将其设置为 0 来获取更好的可访问性。

显然，该方法仅适用于 HTML 页面（或类似的页面），然而并不能应用于图片或者其他类型的内容。

注意这种机制会使浏览器的回退按钮失效：可以返回含有这个头部的页面，但是又会立即跳转。

### 3、JavaScript 重定向机制

在 JavaScript 中，重定向机制的原理是设置 [`window.location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/location) 的属性值，然后加载新的页面。

```js
window.location = "http://example.com/";
```

与 HTML 重定向机制类似，这种方式并不适用于所有类型的资源，并且显然只有在支持 JavaScript 的客户端上才能使用。另外一方面，它也提供了更多的可能性，比如在只有满足了特定的条件的情况下才可以触发重定向机制的场景。

### 4、优先级顺序如下：

1. HTTP 协议的重定向机制永远最先触发，即便是在没有传送任何页面——也就没有页面被（客户端）读取——的情况下。
2. HTML 的重定向机制 ([``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)) 会在 HTTP 协议重定向机制未设置的情况下触发。
3. JavaScript 的重定向机制总是作为最后诉诸的手段，并且只有在客户端开启了 JavaScript 的情况下才起作用。

任何情况下，只要有可能，就应该采用 HTTP 协议的重定向机制，而不要使用 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta) 标签。假如开发人员修改了 HTTP 重定向映射而忘记修改 HTML 页面的重定向映射，那么二者就会不一致，最终结果或者出现无限循环，或者导致其他噩梦的发生。