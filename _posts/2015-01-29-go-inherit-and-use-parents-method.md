---
layout: post
title: "Go inherit and use parent's method"
description: ""
category: 
tags: []
---
{% include JB/setup %}

===先mark 下以免忘记

问题：
对一个非local的type，想进行修改和增加行为
go中是不能对非local的type，新增方法的，也不安全，并且代码也会很混乱
可以使用：
1.组合
	type mytype{
		out outtype
	}
2.类型代用
	type mytype outtype
	outtype(my).method()

	or care
	type mytype *outtype
	(*outtype)(my).method()  
	*outtype(my).method()  是错误的
