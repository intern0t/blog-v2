---
layout: post
title:  "Allowing file Drag and Drops in C#."
author: Prashant Shrestha
date:   2016-01-15 16:25:52 -400
categories: development
tags: C# CSharp .NET Framework Windows Development snippet gui
---

Today, during my personal coding session, I stumbled upon an annoying repetitive thing called browsing for files from the program I was developing. I am sure, I could have just provided a path to the file and not bother with browsing for the file.

Nonetheless, that coding session went well, ignored the annoyance and continued with coding. This morning, as I am typing this blog post, I decided to have a file Drag and Drop feature, might save a little time, but **who** knows if it will really save any amount of time.
<!--excerpt-->
I'll keep it simple and show you the steps to enable Drag and Drop in your form.

Depending on your form component, **choose** the component you wish to enable Drag and Drop. It can be any component, I believe! You can also enable Drag and Drop in the whole form as well.

[![Image](https://i.imgur.com/vRjmMjp.png)](https://i.imgur.com/vRjmMjp.png "File drag and drop demo."){:data-rel="lightcase"}

Open your code window and in the Form constructur below `InitializeComponent();` add this below it.

```cs
this.AllowDrop = true;
this.DragEnter += Main_DragEnter;
this.DragDrop += Main_DragDrop;
```

Add these methods below the constructor or ..

```cs
private void Main_DragDrop(object sender, DragEventArgs e) {
    string[] files = (string[])e.Data.GetData(DataFormats.FileDrop);
    foreach(string file in files) {
        txtFilePath.Text = file;
    }
}

private void Main_DragEnter(object sender, DragEventArgs e) {
    if (e.Data.GetDataPresent(DataFormats.FileDrop)) {
        e.Effect = DragDropEffects.Copy; 
    } else {
        e.Effect = DragDropEffects.None; 
    }
}
```

[![Image](https://i.imgur.com/nawTc1Z.png)](https://i.imgur.com/nawTc1Z.png "Fetched Filepath using drag and drop."){:data-rel="lightcase"}

Just to not confuse you guys, `Main_` is my form's name whereas `txtFilePath` is the textbox component in the form as you can see in the **post** drag & drop image.

Happy Coding!