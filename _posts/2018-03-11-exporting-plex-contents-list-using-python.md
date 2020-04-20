---
layout: post
title: "Exporting PleX contents list using Python."
author: Prashant Shrestha
date: 2018-03-11 10:12:22 -400
categories: server
tags: python server plex movies tv-shows list export xml remote local parse
poster: https://i.imgur.com/phvDLbb.png
---

It didn't quite start out with my friends and family members asking me what movies or genre of movies I watch but more with a slab of XML content thrown at me when I mistyped my Plex URL in the browser. The difference can easily be noticed, even today, on Plex version `1.12.0.4829-*`.

I run my Plex server in a static local IP, `192.168.1.111:32400`, and I came across this absolutely ridiculous slab of `XML` content when I forgot to append `/web` after `:32400` because the actual Plex Web URL format would be `192.168.1.111:32400/web`.
<!--excerpt-->
The slab of XML content is provided below, or you could head to your Plex URL and remove the `/web` parameter to check it out yourself.

{% highlight xml %}
<MediaContainer ..>
    <Directory count="1" key="activities" title="activities" content="1"/>
    <Directory count="1" key="butler" title="butler" content="1"/>
    <Directory count="1" key="channels" title="channels" content="1"/>
    <Directory count="1" key="clients" title="clients" content="1"/>
    <Directory count="1" key="diagnostics" title="diagnostics" content="1"/>
    <Directory count="1" key="hubs" title="hubs" content="1"/>
    <Directory count="1" key="library" title="library"/>
    <Directory count="3" key="livetv" title="livetv"/>
    <Directory count="3" key="media" title="media"/>
    <Directory count="1" key="neighborhood" title="neighborhood"/>
    <Directory count="1" key="playQueues" title="playQueues"/>
    <Directory count="1" key="player" title="player" content="1"/>
    <Directory count="1" key="playlists" title="playlists" content="1"/>
    <Directory count="1" key="resources" title="resources" content="1"/>
    <Directory count="1" key="search" title="search" content="1"/>
    <Directory count="1" key="server" title="server"/>
    <Directory count="1" key="servers" title="servers"/>
    <Directory count="1" key="statistics" title="statistics"/>
    <Directory count="1" key="system" title="system"/>
    <Directory count="1" key="transcode" title="transcode"/>
    <Directory count="1" key="updater" title="updater"/>
    <Directory count="1" key="video" title="video"/>
</MediaContainer>
{% endhighlight %}

I am unsure why Plex haven't implemented the **Export** option for a library of any sort yet but it could be that I am unaware of its existence. Out of all these `Directory` nodes, `library`, `servers`, and `statistics` piqued my interest therefore I started browsing through them and noticed `library` node consisted of three different sub-nodes, `sections`, `recentlyAdded`, `onDeck`. Out of these **3** nodes, `sections` node holds what we need.

{% highlight xml %}
<MediaContainer ..>
	<Directory key="sections" title="Library Sections"/>
	<Directory key="recentlyAdded" title="Recently Added Content"/>
	<Directory key="onDeck" title="On Deck Content"/>
</MediaContainer>
{% endhighlight %}

Browsing `sections` node gave me more nodes, basically contains an **identification** for my libraries, notice the attribute `id` in `Location` node.

{% highlight xml %}
<MediaContainer ..>
	<Directory ..>
	<Location id="2" path="/home/plexserv/Multimedia/Movies"/>
	</Directory>
</MediaContainer>
{% endhighlight %}

If we navigate to `192.168.1.111:32400/library/sections/2`, we are thrown with more slab of XML, sorting/categorized options by the looks of it. The title attribute in these nodes makes it clear that we need the `Directory` node with attribute `key="all"` is all we need to create a list of movies that we have in our library. Verify it by navigating to that directory/node, `192.168.1.111:32400/library/sections/2/all` and viola, there we have it, dumps and dumps of items we have in the library with `id` **2**.

Now we are left with a lots of XML entries, we could share this with our friends but they would probably discard it because finding the title of each entry is quite painful as it varies in length and not always in the same position as the previous entries.

I made use of Python because it has a built-in module for XML parsing called `xml.etree.ElementTree` which is enough for us to parse our Plex Library's sections and create a formatted list for us to share with others. The script is quite short as we used a built-in module provided by Python, available in both `3.*` and `2.*` versions.

{% highlight python %}
import xml.etree.ElementTree as ET
import urllib2

urlHandle = urllib2.urlopen("http://192.168.1.111:32400/library/sections/2/all")
tree = ET.parse(urlHandle)
root = tree.getroot()

f = open('PlexList.txt', 'w')

for child in root.iter('Video'):
    f.write(child.attrib['title'] + "\n")
{% endhighlight %}

.. and there we have it, we used `urllib` module to get the `plexlist.xml` file from the provided URL, initialized and read through each `Video` node in our XML and retrieved our movie title and saved it to `PlexList.txt` for proper identification of files. I could definitely write and extend the crucial and informative contents that we wish to extract from our XML but for now, movie titles should do the job. 

That's about it, easy as pie!

Poster Image credits to [VENNGAGE](https://infograph.venngage.com/p/112848/importexport)!
