---
layout: post
title: "Running OpenVPN server using SoftEther in Windows."
author: Prashant Shrestha
date: 2018-10-26 9:54:14 -400
categories: server
tags: traffic network server management route vpn openvpn encryption privacy
---

I always thought about setting up and using my VPN server was complicated, not that I use VPN that often but it can be put to great use for several things. The process of setting up an OpenVPN server in Windows is pretty straightforward but can't quite guarantee the setup to go smoothly and without any headache.

The headache, I am referring to is specifically the [NAT](https://en.wikipedia.org/wiki/Network_address_translation) set up in my Windows server, didn't have the administrative rights to set up the NAT routing for OpenVPN which **halted** my plan to setup a personal VPN server.
<!--excerpt-->

After a bit of searching, I came across [SoftEther](https://www.softether.org/) which is not a VPN solution per say but more of a compilation of multi-protocol VPN software that allows you to configure and run the VPN server of your choice and availability. Best thing about SoftEther is that it is completely free!

#### SoftEther Installation

Installation of SoftEther is probably the easiest process, especially in Windows platform, you can simply download and install [**SoftEther VPN Server**](https://www.softether.org/5-download) or go directly to the download [page](https://www.softether-download.com/en.aspx?product=softether). Simply select the platform and runtime environment. Download and install, process is pretty simple and straight-forward.

#### Setting Up

Setting up SoftEther is pretty simple as well however it gets confusing sometimes.

* Run **SoftEther VPN Server Manager** and set up a new setting if nothing exists already. Secure your settings with a strong password if your server is shared among others.

{% include lightcase.html name="VF2RHn8.png" alt="SoftEther VPN Server Manager" local="true" %}

{% include lightcase.html name="KSF9Jd6.png" alt="Edit Server Settings" local="true" %}

* Press **Connect** and if no Virtual Hub exists, **Create a Virtual Hub**. Try and enter as strong password as possible.

{% include lightcase.html name="QI62BoW.png" alt="Create a Virtual Hub" local="true" %}

{% include lightcase.html name="lDm093t.png" alt="New Hub" local="true" %}

* Once you have created and set up a *Virtual Hub*, click **Manage Virtual Hub** button.

{% include lightcase.html name="eKvtq2T.png" alt="Manage Virtual Hub" local="true" %}

* Create a new User with strong password (this username and password) can be used to authenticate to our server via. our OpenVPN client. **Password Authentication** is recommended.

{% include lightcase.html name="pQkMky4.png" alt="New User" local="true" %}

* Once done with adding a new user, close the **Create New User** window and launch **Virtual NAT[^1] and Virtual DHCP Server (SecureNAT)** window from **Management of Virtual Hub** window. Enable SecureNAT.

>This was the most important feature SoftEther provided in my situtation because I had almost no access to manage NAT in my Windows server.

{% include lightcase.html name="IokGtwt.png" alt="Enable SecureNAT" local="true" %}

* Head back to Manage Server window > `OpenVPN / MS-SSTP Setting` and enable OpenVPN server. Feel free to generate sample configuration file for your OpenVPN clients from the same window to avoid returning.

{% include lightcase.html name="dTzPpzH.png" alt="OpenVPN" local="true" %}

* I used SoftEther's `Dynamic DNS Setting` to enable dynamic DNS[^2] function, free of charge. This is completely optional!

{% include lightcase.html name="0Ah0xfi.png" alt="Dynamic DNS" local="true" %}

* That should be it for the VPN set up part.

#### Configuring Client's `.ovpn` file.

1. Extract and open the sample configuration file we generated from `OpenVPN / MS-SSTP Setting` window, there should be **two** files. Ignoring the PC Name from the filename `_openvpn_remote_access_l3.ovpn` and `_openvpn_site_to_site_bridge_l2.ovpn`. We need the first one for the **remote access**.

2. Open it with a text editor of your choice. The content inside is pretty clear and contains comment blocks to explain what the settings mean which you can refer to [OpenVPN Documentation](https://openvpn.net/community-resources/how-to/) for further in-detail understanding.

3. The generated sample configuration file with `_openvpn_remote_access_l3.ovpn` on its name will be our client configuration that you can download however, we need to edit our hostname in that file.

4. Change `remote .. 1194` to the dynamic DNS domain provided by SoftEther, e.g. `vpn8******.softether.net` in our set-up [process](/assets/images/2018-10-26-running-openvpn-server-using-softether-in-windows/0Ah0xfi.png){:data-rel="lightcase"}.

5. Once done, edit a field in the configuration file named `auth-user-pass` to `auth-user-pass auth.txt`, rename the file to something simpler, for example `client.ovpn` and download it to your client machine.

#### Creating `auth.txt`

In the same directory where your `client.ovpn` resides, create another file `auth.txt` with the username and password you [set up](/assets/images/2018-10-26-running-openvpn-server-using-softether-in-windows/pQkMky4.png){:data-rel="lightcase"}. Your `auth.txt` content layout should have username in first line, password on the second, that's all.

{% highlight bash %}
username
password
{% endhighlight %}

#### Connecting to our OpenVPN Server

Connecting to our OpenVPN server is quite simple, you can use an OpenVPN client to import your `client.ovpn` or if you are a terminal preferring user like myself, a simple command like so can get the job done.

{% highlight bash %}
sudo openvpn --config client.ovpn
{% endhighlight %}

{% include lightcase.html name="CDxrryj.gif" alt="OpenVPN Usage from Terminal" local="true" %}

Good Luck & stay safe!

---

[^1]: NAT refers to Network Address Translation is a method of remapping one IP address space into another by modifying network address information in the IP header of packets while they are in transit across a traffic routing device. **Source**: [Wikipedia](https://en.wikipedia.org/wiki/Network_address_translation)
[^2]: Dynamic DNS functionality refers to the method of assigning a permanent address to the dynamic hostname, acts like a pointer.
