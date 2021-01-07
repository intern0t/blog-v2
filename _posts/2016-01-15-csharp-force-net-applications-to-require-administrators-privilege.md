---
layout: post
title:  "C# - Force .NET applications to require Administrator's privilege."
author: Prashant Shrestha
date:   2016-01-15 16:25:52 -400
categories: development
tags: C# CSharp .NET Framework Windows Development snippet gui
---

This process is as easy as it comes and totally defies a famous quote.

> Easier said than done!

I use [**Visual Studio**](\"https://www.visualstudio.com/\") [Ultimate 2013]("https://www.visualstudio.com/en-us/products/visual-studio-ultimate-with-msdn-vs.aspx") therefore, this small snippet is the follow up I did after adding this feature in one of my personal project. Forcing administrative privilege requirement on an application built using [.NET frameworks]("https://msdn.microsoft.com/en-us/vstudio/aa496123.aspx") sounds quite difficult or do the lengthy way, `Right Click > Run as Administrator`.

In order to achieve this, you should modify the default manifest file which the Visual Studio generates during the compile process.
<!--excerpt-->
1. Right Click on your Project (in Visual Studio).
2. Add or (Press `Ctrl + Shift + A`)
3. New Item.
4. Application Manifest File (Leave the name as it is, `app.manifest`)
5. Uncomment the line or copy and paste it outside the comment.

Your `app.manifest` default layout should be like this

```xml
<asmv1:assembly manifestversion="1.0"
	xmlns="urn:schemas-microsoft-com:asm.v1"
	xmlns:asmv1="urn:schemas-microsoft-com:asm.v1"
	xmlns:asmv2="urn:schemas-microsoft-com:asm.v2"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<assemblyidentity version="1.0.0.0" name="MyApplication.app/">
		<compatibility
			xmlns="urn:schemas-microsoft-com:compatibility.v1">
			<application></application>
		</compatibility>
	</assemblyidentity>
</asmv1:assembly>
```

Add the following line in your `app.manifest` file nested inside `<asmv1:assembly manifestversion="1.0">` and `</asmv1:assembly>`.

```cs
<requestedExecutionLevel level="requireAdministrator" uiAccess="false" />
```

That is all, save your project, compile and build your application and the difference you will see in the output file will be something like ..

[![Image](https://i.imgur.com/CY5UqwK.png)](https://i.imgur.com/CY5UqwK.png "Build output with requestedExecutionLevel"){:data-rel="lightcase"}

Enjoy Coding!
