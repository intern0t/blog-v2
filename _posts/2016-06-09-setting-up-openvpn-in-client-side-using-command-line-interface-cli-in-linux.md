---
layout: post
title: "Setting up OpenVPN in client side using Command Line Interface (CLI) in Linux."
author: Prashant Shrestha
date: 2016-06-09 18:42:27 -400
categories: security
tags: openvpn encryption traffic network local wifi aes ovpn config setup security
poster: https://i.imgur.com/CLOpk3A.jpg
---

As many citizens became knowledgeable about privacy, VPN, private network, tunnels, why, how, disadvantages and all, the VPN companies developed advanced client software to make client's work easier, especially for Windows platform but for Linux platform with no Network Manager or simple CLI fans out there have to go through painful steps to setup a VPN.

If you are wondering what a VPN (Virtual Private Network) is then do read this small excerpt I pulled from [Wikipedia](https://en.wikipedia.org/wiki/Virtual_private_network).
<!--excerpt-->
> A virtual private network (VPN) extends a private network across a public network or internet. It enables users to send and receive data across shared or public networks as if their computing devices were directly connected to the private network.

>VPNs can provide functionality, security and/or network management benefits to the user. But they can also lead to new issues, and some VPN services, especially "free" ones, can actually violate their users' privacy by logging their usage and making it available without their consent, or make money by selling the user's bandwidth to other users. (**Source** : [Wikipedia](https://en.wikipedia.org/wiki/Virtual_private_network))

That's how it is, if you still think this little citation is confusing, here's the infographic that might help you understand it better.

[![](https://i.imgur.com/xCXmz2U.png)](https://i.imgur.com/xCXmz2U.png)

I am not a frequent cafe going person and I know how important a VPN and/or a proxy is when you are accessing public networks, it is as important for surfing internet for regular contents. Couple years ago, VPN was used to stay anonymous, a peace of mind and hide your surf origin (your location) but now it's a whole different ball game. There are regularly used websites who tracks your IP Addresses, DNS, ISP (Internet service provider), region time etc. etc. so much that it makes people feel insecure. Even hoaxes of companies selling Credit cards, email addresses, IP Addresses, Cell phone numbers are pretty scary. Credit cards, email addresses, IP Addresses can be changed with a little to no fees at all but cell phone numbers? houses? apartments? Can't be changed as often.

That's where VPN comes into play but with the increase in VPN usage by **many** users, couple companies started blocking their services to those who use VPN/proxies. Take one of the most popular streaming services as an example - **Netflix**, they have been banning VPN/Proxies for a while now and imagine their loss in customers.

VPN and proxies are used for illegal purposes often, do you not read the news? There are websites taken down every minute, credit cards information stolen, sold, scariest of all - social security numbers and the lawmen can't find the ones who did all these bad deeds.

This blog post is getting too long - in short, whether it be cheap or free, get a VPN, proxy is not as powerful as a VPN and there are VPN services out there which provides their clients with additional services with their VPN which I will list later on.

I will be targeting Linux operating systems, more like Arch Linux for I am running one at this very moment in a terminal.

[![](https://i.imgur.com/F2Td2gF.png)](https://i.imgur.com/F2Td2gF.png)

If you must know I am using ibVPN for my workstation which is decent, not the fastest and not the slowest either, the price is fair.

First of all install **OpenVPN**. Arch has it in their official repository therefore ..

{% highlight bash %}
sudo pacman -S openvpn

# For CentOS
yum -y install openvpn easy-rsa
{% endhighlight %}

Download configuration file from your VPN provider, some provide configurations packed in .zip/.rar/.tar/.gz/.tar.gz or you have to download them one by one. The OpenVPN configuration file ends with the extension `.ovpn`.

Once you have the `.ovpn` files, copy it over to `/etc/openvpn` directory and enter the following command in your terminal to connect to the server.

{% highlight bash %}
sudo openvpn --config <configuration_file_name.ovpn>
{% endhighlight %}

For ease and speedy use, you can use wildcards to specify file names. I also prefer not to type in the username and passwords every time I try to connect to the VPN server. Instead, I specify which authentication file to use with the configuration I use the most. One of ibVPN's configuration file looks like this.

{% highlight bash %}
remote us8.ibvpn.com 1194 udp
remote <IP> 80 udp
remote <IP> 443 udp
remote <IP> 53 udp
client
dev tap
resolv-retry infinite
script-security 3 system
explicit-exit-notify 3
persist-key
mute-replay-warnings
ca ibvpn.com.crt
comp-lzo
verb 3
mute 20
ns-cert-type server
fragment 1300
route-delay 2
auth-user-pass
auth-retry nointeract
reneg-sec 0
up "/etc/openvpn/change_resolv_conf.sh up"
down "/etc/openvpn/change_resolv_conf.sh down"
{% endhighlight %}

See the `auth-user-pass` field is empty? I specified mine as `autho.txt` and created a new file in `/etc/openvpn` with my username and password for ibVPN. Make sure you append username and password in different line.

{% highlight bash %}
nano /etc/openvpn/autho.txt

# Username (Without #)
# Password (Without #)
{% endhighlight %}

Save the file and try connecting to the VPN server using the configuration file we just made changes to.

{% highlight bash %}
sudo openvpn --config <configuration_file_name.ovpn>
{% endhighlight %}

It will now no longer prompt for username and password, fast when you are in a rush.

You have to leave the terminal open and the configuration running in order to stay connected. Now for the **perks** you **might** get from VPN providers -

1. Optimized speed.
2. Optimized streaming speed.
3. DNS leak security. (Used mostly by attackers to find your ISP)
4. **Unlimited** speed and bandwidth. (It's a given!)

My family is a Cox customer and we don't pay much, $49<sup>99</sup> per month for mere 250 GB bandwidth. Speed sucks, can't even stream a live Football match properly, I tried **ibVPN**, it was alright, a little better then I used [**ExpressVPN**](https://www.expressvpn.com/), the speed is blazin' fast.

Enjoy!

Image Credits - Post Image - [**Privatoria.net**](https://privatoria.net/wp-content/uploads/2015/06/vpn-protocols.jpg).