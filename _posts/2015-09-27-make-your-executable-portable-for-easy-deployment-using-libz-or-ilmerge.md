---
layout: post
title: "Make your .NET executable portable for easy deployment using Libz or ILMerge."
author: Prashant Shrestha
date: 2015-09-27 18:08:52 -400
categories: development
tags: setup portable executable build deployment libz ilmerge c#
---

Here again, writing another post about a feat I achieved against a problem while sharing one of my program with my friends and the problem I came across was the ease of deployment, not that it was making my work difficult but it just looked very weird for a small program to have many dependencies and all these files with it.

The version of program I shared with my friends before turning it into portable executable.
<!--excerpt-->
[![Image](https://i.imgur.com/xSqa6ex.png)](https://i.imgur.com/xSqa6ex.png){:data-rel="lightcase"}

And the one after the libraries merge is shown below with only one executable which makes the portability easier, smaller, faster and cleaner.

[![Image](https://i.imgur.com/gpe6oEM.png)](https://i.imgur.com/gpe6oEM.png){:data-rel="lightcase"}

Achieving this wasn't that difficult considering the vast amount of tools found online and for free. I will be using two most popular library mergers to merge all these libraries into a single executable for clean portability.

[**ILMerge**](http://download.microsoft.com/download/1/3/4/1347C99E-9DFB-4252-8F6D-A3129A069F79/ILMerge.msi) and [**Libz**](https://github.com/MiloszKrajewski/LibZ), both are free and can be downloaded directly from their original website.

One good thing about ILMerge is it is trusted compared to Libz and any other 3rd party mergers. ILMerge was developed and distributed by **Microsoft** itself.

Download ILMerge, install it and download [ILMerge GUI](https://ilmergegui.codeplex.com/).

ILMerge GUI makes your life easier if you are the kind of person who doesn't like CLI and commands.

[![Image](https://i.imgur.com/BvkHqsd.png)](https://i.imgur.com/BvkHqsd.png){:data-rel="lightcase"}

You just have to drop all the libraries, executables or assemblies into the `Drop assemblies here...` section.

Specify the Output assembly with the name for your merged executable and press **Merge** button on the bottom right corner. Easy as pie!

[![Image](https://i.imgur.com/9XyiH9w.jpg)](https://i.imgur.com/9XyiH9w.jpg){:data-rel="lightcase"}

Lets move on to [**Libz**](https://github.com/MiloszKrajewski/LibZ) which does the same thing as ILMerge but a third party.

After you download Libz, you have to extract the content into a separate directory. It contains 3 files in total, very light and very easy.

[![Image](https://i.imgur.com/84IU6DJ.png)](https://i.imgur.com/84IU6DJ.png){:data-rel="lightcase"}

You will be working with commands in this particular merger and I have not found any GUI version for it but you might if you search it long enough or make your own.

[![Image](https://i.imgur.com/e5BnynU.png)](https://i.imgur.com/e5BnynU.png){:data-rel="lightcase"}

Go to the directory where you have Libz stored as shown in the image above.

It will be easier if you store your **to be merged** files inside the same directory for the time being.

[![Image](https://i.imgur.com/SxY08b8.png)](https://i.imgur.com/SxY08b8.png){:data-rel="lightcase"}

Now head over to your command prompt and enter the follow line of command into it, copy paste works as well. Just don't forget to specify the name of the file.

```bash
libz inject-dll -a <Your_File_Name>.exe -i *.dll -e *sql* --move
```

[![Image](https://i.imgur.com/NDvpPb4.png)](https://i.imgur.com/NDvpPb4.png){:data-rel="lightcase"}

Which should produce result which might be similar to something like this ..

[![Image](https://i.imgur.com/OIJx492.png)](https://i.imgur.com/OIJx492.png){:data-rel="lightcase"}

If you look at the Libz directory, you should now see that the libraries disappeared and the only thing left is your executable which is now portable and professional lookin'.

[![Image](https://i.imgur.com/bjtIGVB.png)](https://i.imgur.com/bjtIGVB.png){:data-rel="lightcase"}

Enjoy the distribution of your softwares & Namaste!