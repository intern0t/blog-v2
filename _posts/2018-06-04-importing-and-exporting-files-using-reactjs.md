---
layout: post
title: "Importing and exporting files using ReactJS." 
author: Prashant Shrestha 
date: 2018-06-04 13:43:14 -400
categories: development
tags: reactjs javascript json export file import clientside framework upload 
poster: https://i.imgur.com/4jqFvB9.jpg
---

While learning [ReactJS](https://reactjs.org/) over this summer and one of the biggest mistakes I made was using a third-party library to outline my layouts, just because I didn't want to go through all the hassle of designing a whole website.

I reviewed quite a lot of possible projects that I could try while in the process of learning ReactJS and also stumbled upon this [frightful post about puppy dieing](https://medium.freecodecamp.org/every-time-you-build-a-to-do-list-app-a-puppy-dies-505b54637a5d) when someone builds a [To-do](https://intern0t.github.io/Trail/) list applications. It's whatever at this point, if building a To-do application teaches me quite a lot of things about ReactJS, **why not?!**

<!--excerpt-->

Anyways, back to our context of importing files using ReactJS, it's quite similar to Javascript but considering I used [ANT Design](https://ant.design/) [library](https://www.npmjs.com/package/antd), the documentation wasn't quite clear enough, or let's just say incomplete for what I was looking to do. 

> I think, the biggest problem for me was that I was trying to read a `.json` file without completely uploading it to a server (**fully client-sided**). [^1]

While playing with `antd` [Upload](https://ant.design/components/upload/) component, it was clear enough until importing a file and initializing the `file` but never actually clearly mentioned about `originFileObj`. Let's take any of those components as an example and look through their sample code.

{% highlight react %}
const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
{% endhighlight %}

I then started searching for answers about why `info.file` wasn't returning an actual file handle for me to read through with `FileReader()` but worked flawlessly as `info.file` was missing `originFileObj` property that actually is the actual file object handle. 

We have two options to access our actual file object, we could use either `info.file.originFileObj` or `info.fileList[..].originFileObj`. Below is the code I used in my To-do tasks application.

{% highlight react %}
render(){
    const { visible, onCancel, onCreate, onImport } = this.props;

    const props = {
        name: 'file',
        multiple: false,
        accept: '.json',
        action: '//jsonplaceholder.typicode.com/posts/',    // Random action URL, a placeholder.

        onChange(info) {
            // Not really required but for debugging purposes.
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                let fileReader = new FileReader();
                fileReader.onload = function (fileLoadedEvent) {
                    let textFromFileLoaded = fileLoadedEvent.target.result;
                    onImport(textFromFileLoaded);
                };
                // `originFileObj`, most important.
                fileReader.readAsText(info.fileList[0].originFileObj);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
            return false;
        },
    };

    return (
        <Modal
            visible={visible}
            title="Import Tasks"
            okText="Import"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="file-add" />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                    Please upload only one, although this feature allows multiple file(s) selection.
                </p>
            </Dragger>
        </Modal>
    );
}
{% endhighlight %}

Exporting files as **JSON** is pretty easy as well after reading some documentations.

{% highlight react %}
/** Exporting a Tasks list. */
exportTasks = () => {
    /**
     * Blob for immutable file-like object - https://devdocs.io/dom/blob
     * Creating a hidden link element - https://devdocs.io/dom/document/createelement
     * Attributes - https://devdocs.io/html/element/link
     */
    if (this.state.Tasks.length > 0) {
        let tasksToExport = JSON.stringify(this.state.Tasks);
        let exportWithHeader = "data:application/json;charset=utf-8," + encodeURIComponent(tasksToExport);
        let exportDate = new Date().toJSON().slice(0, 10).replace(/\//g, '-') + ".json";
        let blob = new Blob([tasksToExport], { type: 'text/json;charset=utf-8;' });
        let downloadLink = document.createElement('a');
        let url = URL.createObjectURL(blob);
        downloadLink.setAttribute("href", url);
        downloadLink.setAttribute("download", exportDate);
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        message.success("Tasks successfully exported with the filename : " + exportDate);
    } else {
        // No Tasks to export.
        message.error("There are no tasks to export, please create a task first.");
    }
};
{% endhighlight %}

Pretty funny problem but as long as the solution is quite fun to find, we are good!

Poster photo by [Igor Ovsyannykov](https://unsplash.com/photos/zIAOSvHzvBw) on [Unsplash](https://unsplash.com/).

Happy Coding!

***

[^1]: The reason behind me wanting to read a JSON file completely client side was because of the project I was working on. [Trail](https://trail.prashant.me/) is a task completion web-application developed in [ReactJS](https://reactjs.org/), I wanted to make it as simple as possible as there was no plans to create a way to backup the data.