---
layout: post
title: "Two-Factor Authentication to your server with Google Authenticator!"
author: Prashant Shrestha
date: 2015-06-04 13:18:48 -400
categories: security
tags: security server administrator setup lock block google authenticator time
---

A web server is a place which holds various important stuffs, chunks and chunks of data and such which are very essential to keep a website up and running! For me, personally I need much larger **space for privacy** when it comes to the things that I own whether it be a server, a car, an apartment or whatever!

I personally cannot secure everything that I own but definitely have tried my best and with my utmost knowledge to protect my hard-work. I would definitely not want someone else accessing my server, not because I've some super secret stuff but I just don't like people crossing my boundaries of privacy. Therefore, today I installed a great module in all 5 servers that I own, hardening the security and such which I think is very secure as I am trusting my server access handling to [Google](https://www.google.com/)!
<!--excerpt-->
The security of our servers is of an essence and not everyone can afford to have a bunker like server. Even if a medium such as Email verification codes are to be used, we have **no** idea of who accesses it and personally I believe to be very vulnerable.  I am not saying it is very easy to get in someone else's email address by any means, it's just that they are able to.

I own 5 different servers, 2 in United States and other 3 somewhere else and I feel insecure about my servers as its been couple months I started using Linux and I am not that good yet. Today I learned about [**Two-factor Google Authentication system**](https://github.com/google/google-authenticator) which requires you to have an operable server and a smartphone! **That's it!**

So using one of my disposable CentOS server, I started a personal campaign to install Google Authentication in all **5** servers that I own.

I started by updating my servers, mind you, I had **5** simultaneous terminals open in my personal computer. Considering all my servers use CentOS, it was quite easy for me.

{% highlight bash %}
yum -y update
{% endhighlight %}

If you get any errors, execute `yum clean all` command in your terminal. After updating my system, I installed `pam-devel` which is more like a permission set for Linux which manages **authentication policies**.

{% highlight bash %}
yum -y install pam-devel
{% endhighlight %}

Considering we will be managing and limiting our SSH access, I ensured `ntpd` is up and active which handles the [TOTP](http://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm) security ([Time-based One-time Password](http://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm)).

{% highlight bash %}
# Check if the service is already installed! Normally it is NOT!
service ntpd status

# Start the service!
/etc/init.d/ntpd start

# Launch at startup!
chkconfig ntpd on

# Install NTP.
yum -y install ntp
{% endhighlight %}

[NTP](http://en.wikipedia.org/wiki/Network_Time_Protocol) and [NTPD](http://en.wikipedia.org/wiki/Ntpd) are two different things although have similar agenda. **D** in the end of **NTPD** stands for **daemon** which means it's a background process which handles the actual [NTP](http://en.wikipedia.org/wiki/Network_Time_Protocol).

After following the above commands, let us head towards some compile and conquer steps.

{% highlight bash %}
cd /opt
wget https://google-authenticator.googlecode.com/files/libpam-google-authenticator-1.0-source.tar.bz2
bunzip2 libpam-google-authenticator-1.0-source.tar.bz2
tar -xvzf libpam-google-authenticator-1.0-source.tar
cd libpam-google-authenticator-1.0
{% endhighlight %}

After changing your directory to the extracted google-authentication directory, you should now compile and create install using ..

{% highlight bash %}
make
make install
{% endhighlight %}

Now, go back to `~ root directory` using `cd ~` and run `google-authenticator` by running the command line ..

{% highlight bash %}
google-authenticator
{% endhighlight %}

Read and input your choices when it asks for **(y/N)** options, there are around 3-4 questions, I input **yes** on all of them. After the **first** *yes* input, google-authenticator provided me with vital information such as **secret key**, **validation codes** and **emergency scratch codes**. Copy them in a notepad or make a hard copy of it or whatever. The secret key and the emergency scratch codes are the most important ones, if you ask me!

Append the line below at the **top** of the file `/etc/pam.d/sshd`. The orders matter. Use `nano` or `vim` editor.

{% highlight bash %}
auth       required     pam_google_authenticator.so
{% endhighlight %}

As we are authenticating the SSH access, edit `/etc/ssh/sshd_config` and change your options to

{% highlight bash %}
PasswordAuthentication yes
ChallengeResponseAuthentication yes
UsePAM yes
{% endhighlight %}

Restart `ssh` using 

{% highlight bash %}
service sshd restart
{% endhighlight %}

Now that we are all set, **do not** logout from the SSH yet. Open your smartphone, download Google Authenticator application from your application store ([iOS](https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8) or [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en)). I use android therefore, [play store](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en) for me. Now you can logout but don't forget to keep your phone **ready**!

In the Add an account screen, select **Enter provided key** and enter the secret key that the google authenticator provided you with.

[![](https://i.imgur.com/NvwFEml.png){:width="353px"}](https://i.imgur.com/NvwFEml.png){:data-rel="lightcase"}

All done? You should have something like this in your smartphone when you try to access the SSH.

[![](https://i.imgur.com/fxeYqfT.png){:width="353px"}](https://i.imgur.com/fxeYqfT.png){:data-rel="lightcase"}

The pie-chart like figure is the **30 second** window for you to fully login to your system before you are assigned with different verification code!

The main server password remains the **same**!

~ Enjoy and Good Luck securing your server!