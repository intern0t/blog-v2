---
layout: post
title: "Creating a Proxy redirection with Redir" 
author: Prashant Shrestha 
date: 2015-05-29 20:40:14 -400 
categories: server 
tags: traffic network redirection server administration management redir proxy route
---

When you **normally** launch or host a website through Linux Web Server Software such as [Apache](http://httpd.apache.org), [Lighttpd](http://www.lighttpd.net/download/) or [Nginx](http://nginx.org/en/download.html), you will be freely publicizing your server's IP Address unless you use a 3<sup>rd</sup> party DNS service to conceal your server's IP.

There are various ways to conceal your server's IP Address from **normal** consumers to protect yourself from *raw* intrusions however that requires quite a bit of funding. One service which is quite big, widely known and provides free DNS nameserver for disposal is [Cloudflare](http://cloudflare.com/). Cloudflare provides their consumer with 3-4 [packages](https://www.cloudflare.com/plans) - Basic (free), Pro ($20/m.), Business ($200+/m.) and Enterprise ($5000/m.).
<!--excerpt-->
If your server is **not** DDoS protected and if your server suffers an attack, you will go down easy, it is the same for the server hosting this blog as well. No DDoS protection nor have I tried to hide my server's IP Address.

To keep the blog short, proxy redirection uses a small server compared to your main server, around ***1-2 GB*** RAM and ***couple*** gigs hard disk space should suffice and would be great if it also has a full fledged DDoS Protection.

>Redir redirects tcp connections coming in to a local port to a specified address/port combination. It may be run either from inetd or as a standalone daemon. Depending on how redir was compiled, not all options may be available. ([- Redir](http://linux.die.net/man/1/redir))

I use CentOS 6 therefore, this guide shall reflect my way of installing Redir in CentOS systems.

First of all download the package manager from [Redir's Official download](http://pkgs.repoforge.org/redir/) page, make sure your OS settings match the package provided by Redir.

Using wget, we can download the `.rpm` package ..

{% highlight bash %}
wget http://pkgs.repoforge.org/redir/redir-2.2.1-1.1.*.*.*.rpm
{% endhighlight %}
**Please do keep in mind, the asterisk (*) is replaced by your needs and your system infrastructure.**

After the package arrives in your system, you may execute the `.rpm` file with ..

{% highlight bash %}
rpm -i redir-2.2.1-1.1.*.*.*.rpm
{% endhighlight %}

After installation of Redir in your system, you may add or execute the command to redirect the incoming packets from the local port to a remote port of your choice. For better security and to minimize the intrusion abuse, add an exception in [IPTables](http://ipset.netfilter.org/iptables.man.html) in your main-server to receive packets/traffic from the proxy server **only** so that any other raw connections to your main server will either be rejected or dropped. *(I personally like dropping the requests without any warning!)*

In order to redirect the traffic from server A with an IP of **(1.1.1.1)** to B with an IP of **(2.2.2.2)** or vice-versa is to run this command through your terminal in either of the server depending on your need (incoming/outgoing).

{% highlight bash %}
redir --laddr=1.1.1.1 --lport=80 --caddr=2.2.2.2 --cport=80
{% endhighlight %}

After you add this, you might also want to add this code to the startup to launch this setting if in case anything happens to the server which requires a reboot. You can optimize the Redir's setting while typing the code, Redir takes the following options/parameters for its settings.

{% highlight bash %}
nano /etc/rc.d/rc.local
{% endhighlight %}
`rc.local` file holds a list of command to be executed after initial system reboot and after system programs are loaded.

{% highlight bash %}
which redir
# Finds the path to the service name - redir.
{% endhighlight %}
Append the `rc.local` file with the full path and the bash script in the end.

{% highlight bash %}
/path/to/redir/<scriptname>.sh
{% endhighlight %}

{% highlight bash %}
--lport
Specifies port to listen for connections on (when not running from inetd)

--laddr
IP address to bind to when listening for connections (when not running from inetd)

--cport
Specifies port to connect to.

--caddr
Specifies remote host to connect to. (localhost if omitted)

--inetd
Run as a process started from inetd, with the connection passed as stdin and stdout on startup.

--debug
Write debug output to stderr or syslog.

--name
Specify program name to be used for TCP wrapper checks and syslog logging.

--timeout
Timeout and close the connection after n seconds of inactivity.

--syslog
Log information to syslog.

--bind_addr
Forces redir to pick a specific address/interface to bind to when it listens for incoming connections.

--ftp
When using redir for an FTP server, this will cause redir to also redirect ftp connections. Type should be specified as either "port", "pasv", or "both", to specify what type of FTP connection to handle. Note that --transproxy often makes one or the other (generally port) undesirable.

--transproxy
On a linux system with transparent proxying enabled, causes redir to make connections appear as if they had come from their true origin. (see /usr/share/doc/redir-2.2.1/transproxy.txt)

--connect
Redirects connections through an HTTP proxy which supports the CONNECT command. Specify the address and port of the proxy using --caddr and --cport. --connect requires the hostname and port which the HTTP proxy will be asked to connect to.

--bufsize n
Set the bufsize (defaut 4096) in bytes. Can be used combined with --max_bandwidth or --random_wait to simulate a slow connection.

--max_bandwidth n
Reduce the bandwidth to be no more than n bits/sec. The algorithme is basic, the goal is to simulate a slow connection, so there is no pic acceptance.

--random_wait n
Wait between 0 and 2 x n milliseconds before each "packet". A "packet" is a bloc of data read in one time by redir. A "packet" size is always less than the bufsize (see also --bufsize).

--wait_in_out n
Apply --max_bandwidth and --random_wait for input if n=1, output if n=2 and both if n=3.
{% endhighlight %}

Now that we know how to setup a redirection, lets add an IPTables rule in our main server to accept the traffic from that specific IP Address and port.

{% highlight bash %}
iptables -N ProxyRedirection 
# The above code creates a new chain in our IPTables.

iptables -A ProxyRedirection --src 1.1.1.1 # allow 1.1.1.1
# Allow traffic from the IP Address 1.1.1.1, you can add more.

iptables -A ProxyRedirection -j DROP
# Blocks everything else, if it doesn't match the *Allow IP in the chain.

iptables -I INPUT -m tcp -p tcp --dport 80 -j ProxyRedirection
# Enforce the chain rule from ProxyRedirection.

service iptables save
# Save and restart IPTables rules.
{% endhighlight %}

I am not implying that you can only use port 80 redirection, it was just an example which you can make changes to your need and necessities. If you have a dedicated proxy redirection setup (in simple words, many proxy redirection setup), you might want to look into [Squid](http://www.squid-cache.org/) which could help you save lots of bandwidth.

This very same method can be used to **deflect** a medium DDoS attacks, depending on your server provider's service. If you have a dedicated IP to null-route or filter traffic, it can very well be used as a Firewall, literally.

{% highlight bash %}
[Traffic]->[S.P Firewall]->[Filtered IP]->[Proxy Server]->[Your Server]
# S.P stands for Service Provider's.
{% endhighlight %}

Very sad however, I have yet to find good yet cheap host which provides those features for someone with minimal budget like myself. I shall continue the search nonetheless.

~ Good Luck!