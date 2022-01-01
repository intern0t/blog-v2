---
layout: post
title: Reverse proxy domain to web applications with Portzilla.
author: Prashant Shrestha
date: 2021-12-31 13:29:14 -400
categories: linux
tags: file manager linux xdg-mime inode directory
---

Running mulitple web applications and creating a reverse proxy to avoid ports overlap is not a problem anymore. The problem I had was that I had to deploy multiple web applications *(personal projects)* in various subdomains of my main domain. What I needed was an easy proxy from my subdomain to my server(s) at specific but separate ports.

```bash
surl.prashant.me -> SERVER:PORT1
paste.prashant.me -> SERVER:PORT2
```

After some search, I found out about [Portzilla](), a free-to-use application available in [Cloudflare]() that can help replicate reverse proxy without any problems.

> Proxy traffic from any URL on your domain to a service listening on another port. You can even send headers along with each request. *[(Portzilla)](https://www.networkchimp.fun/tutorials/portzilla-api.html)*

