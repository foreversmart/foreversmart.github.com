---
layout: post
title: "Go lazy evaluation"
description: ""
category: 
tags: []
---
{% include JB/setup %}

作者：ForeverSmart   
[原文链接:](http://foreversmart.github.io/go/2015/04/13/go-function-introduction-1/) http://foreversmart.github.io/go/2015/04/13/go-function-introduction-1/

----

### Lazy Evaluation

惰性求值(Lazy Evaluation)：是一种计算策略，延迟计算一个表达式或函数当需要时才进行计算

我们可以通过惰性求值来避免不必要的计算，也可以通过惰性求值来构造一个无限数据结构,还可以通过惰性求值定义一个像原语的控制流。

在介绍惰性求值前,先来举一个生成器(Generator)的例子
这个生成器是一个函数每次调用会返回特定序列中的下一个值
这其实就是一个惰性求值的应用，因为每次返回的是需要的下一个值而不是整个序列

//eg. generator

//构造无限数据结构

//使用惰性求值求解Fibonacci问题

//限定求解当前值

//定义原语控制流


