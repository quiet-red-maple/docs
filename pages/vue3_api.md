### 1、 生命周期

Vue3中有八个生命周期函数，

- beforeCreate( ) ：在实例生成之前会自动执行的函数
- created( ) : 在实例生成之后会自动执行的函数
- beforeMount( ) : 在模板渲染完成之前执行的函数
- mounted( ) : 在模板渲染完成之后执行的函数
- beforeUpdate ：当data中的数据变化时， 会立即自动执行的函数
- updated：当data中的数据发生变化，页面重新渲染完后，会自动执行的函数
- beforeUnmount( ) :当Vue应用失效时，会自动执行的函数
- unmounted() : 当Vue应用失效时，且DOM完全销毁之后，会自动执行

这些生命周期虽然多，你可以成对的去记忆，这样就有四个关键节点了：创建、渲染、更新、销毁。

### 2、``v-html``

使用 `v-html="数据"`用来展示数据为html

```vue
<template>
  <h1>{{ msg }}</h1>
  <div v-html="value"></div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      value: "<p>what happend</p>",
    };
  },
};
</script>

```

### 3、``v-once``

使用 `v-once`用来只首次渲染data中的值，无论data中的数据如何变化，模板也不会再次重新渲染了

```vue
<template>
  <h1>{{ msg }}</h1>
  <button @click="count++" v-once>count is: {{ count }}</button>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
};
</script>
```

### 4、``v-bind:``/ ``:``

使用` v-bind: `用来绑定动态数据,可以用`:`简写

```vue
<template>
  <h1>{{ msg }}</h1>
  <div v-html="value" v-bind:title="msg"></div>
	<div v-html="value" :title="msg"></div>

  <button @click="count++" v-once>count is: {{ count }}</button>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
      value: "<i>what happend</i>",
    };
  },
};
</script>

```

### 5、``v-on:``/``@``

`v-on:`是用来绑定响应事件的,可以使用`@`简写

```vue
<template>
  <button @click="count++">count is: {{ count }}</button>
  <button v-on:click="count++">count is: {{ count }}</button>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      count: 0,
    };
  },
};
</script>
```

### 6、``:[name]="msg"``

`:[name]="msg"`可以设置动态属性 

注：name 和 msg 都必须是动态变量

```vue
<template>
  <h1>{{ msg }}</h1>
  <div v-html="value" v-bind:title="msg"></div>

  <button @click="count++" :[name]="msg">count is: {{ count }}</button>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
      name: "title2",
      value: "<i>what happend</i>",
    };
  },
};
</script>
```

### 7、``@[event]="事件"``

`@[event]="事件"`可以设置动态绑定事件

```vue
<template>
  <button @[event]="count++">count is: {{ count }}</button>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
      event: "click",
    };
  },
};
</script>
```

### 8、``@click.prevent="事件"``

`@click.prevent="事件"`可以阻止默认行为，例如form 表单的默认提交事件

```vue
<template>
  <form action="https://jspang.com" @click.prevent="hanldeButton">
    <button type="submit">默认提交</button>
  </form>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
      event: "click",
    };
  },

  methods: {
    hanldeButton(e) {
      // e.preventDefault();
    },
  },
};
</script>
```

### 9、``v-if/v-else``

`v-if/v-else`用来判断渲染

```vue
<template>
  <!-- <h2 @click="handleItemClick" v-if="message == 'jspang.com'" class="one">
    {{ message }}
  </h2>
  <h2 @click="handleItemClick" v-if="message == '技术胖'" class="two">
    {{ message }}
  </h2>
  <h2 @click="handleItemClick" v-if="message == 'bilibili'" class="three">
    {{ message }}
  </h2> -->

  <h2 @click="handleItemClick" v-if="message == 'bilibili'" class="one">
    {{ message }}
  </h2>
  <h2 @click="handleItemClick" v-else class="three">{{ message }}</h2>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
      message: "bilibili",
    };
  },

  methods: {
    handleItemClick(e) {
      // e.preventDefault();
    },
  },
};
</script>

<style>
.one {
  color: red;
}
.two {
  color: green;
}
.three {
  color: orange;
}
</style>

```

### 10、``computed``

`computed`计算属性

1. 方法methods：只要页面重新渲染，就会重新执行方法
2. 计算属性computed: 当计算属性依赖的内容发生变更时，才会重新执行计算

```vue
computed:{
    total(){
        return this.price * this.count
    }
},
```

### 11、``watch``

Vue中的侦听器（也有叫监听器），它可以侦听data中值的变化，做出相应的操作。

```vue
<template>
  <button @[event]="count++">count is: {{ count }}</button>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
      event: "click",
    };
  },
  watch: {
    count(current, prev) {
      console.log("watch changed");
      console.log("现在的值：", current);
      console.log("变化前的值：", prev);
    },
  },
};
</script>
```

- `computed` 和 `method`都能实现的功能，建议使用computed,因为有缓存，不用渲染页面就刷新。
- `computed` 和 `watch` 都能实现的功能，建议使用 computed，因为更加简洁。

### 12、``v-show``

`V-show`用来决定dom元素是否显示隐藏

```vue
<template>
  <h2 v-show="show">JSPang.com</h2>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      show: true,
    };
  },
};
</script>
```
