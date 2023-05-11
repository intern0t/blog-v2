---
layout: post
title: "Fixing Plex downloads by disabling DNS Rebind Protection" 
author: Prashant Shrestha 
date: 2023-05-10 20:30:14 -400 
categories: server 
tags: traffic network redirection server router dns
---

A setting called "DNS Rebind Protection" which is normally auto-enabled in router could impact Plex's download feature. Plex would throw errors such as ***Error 409*** or **Failed to download**.

### Fix
In order to fix it, we need to either completely disable the DNS Rebind Protection in our router which is quite often not recommended because of security risks. Instead, we can add an exception, entry for `plex.direct` or the IP Address of the Plex server.

Adding an entry in my current router was not possible, however, adding an exception for an IP Address is allowed.

{% include lightcase.html name="dns-rebind-protection-router-screenshot.png" alt="DNS Rebind Protection Router Screenshot" local="true" %}

:party_popper: