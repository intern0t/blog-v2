---
layout: post
title:  "Custom Image Hosting and Upload Script"
author: Prashant Shrestha
permalink: /project/hostup
date:   2016-02-18 06:31:49 -400
categories: development
tags: setup server private php python upload postman api
poster: https://i.imgur.com/eFbN8c9.jpg
---

There are countless free image hosting services out there but having your own, separate image server has different purpose of its own. There are lots of benefits of having your own image hosting, personal, nothing complicated.

A bit of a knowledge is a must, if you wish to modify and better the scripts I wrote but if you simply wish to use it, ignoring the security flaws, be my guest!

Before you start copy-pasting the codes, please be aware that these scripts that I wrote for my personal use are **not secure enough**, use it at your own risk!

I also wish to mention that this personal image hosting is completely optional with all these awesome image hosting services out there which are going to be better, faster, secure and optimized compared to our little personal image hosting. Take [Imgur](https://imgur.com/) for example, provides both Non-SSL and SSL linking, which is better for sites such as mine which requires the content to load over SSL rather than Non-SSL to keep the lock intact.
<!--excerpt-->
First of all, you are going to need a hosting plan, a server or a remote storage. We are going to achieve our own personal image hosting with total of 2 files.

#### Things I used

1. Python script (Linux based uploads + screenshot)
2. PHP script (Server side to handle proper file storage)

If you are going to use this for your personal use or just between your friends for hotlinking images to your own website then I suggest using a subdomain and preventing hotlinking to any other hosts except your own.

I created a subdomain for my current domain, `cdn.prashant.me` to handle the image storage. Apply the same SSL certificate and key file to the subdomain to have SSL.

Open up your IDE and start with creating a PHP script which will take POST data and generate a random file name and save it to the directory or simply the chroot directory. For me, `cdn.*` will be used only for image hosting therefore, i will simply use the main directory (i know, very unorganized!)

I beforehand wrote a `.htaccess` rule just to keep the URL clean.

```
RewriteEngine On
RewriteRule ^upload$ /upload.php [L,NS]
```

```php
<?php
	/**
		Document 		: CDN/upload.php
		Description		: Authentication + Upload handler.
		Date 			: 2016-03-04
		Copyright (c) Prashant M. Shrestha (www.prashant.me)
	**/

	define('HOST', 'https://cdn.prashant.me/');
	// Change it => 1prashantmshrestha1 <- MD5
	define('_KEY', 'cbc0d1cfa4f7d27b0db6f0e125ef2793');
	// Change it => *1*prashantmshrestha*1* <- Salt
	define('SALT', '1');

	if(isset($_FILES['file']) && isset($_POST['securityKey'])){
		$ourKey = md5(SALT. $_POST['securityKey'] . SALT);
		if (strcmp(_KEY, $ourKey) === 0) {
		    // The key matches, therefore continue the upload!
		    // Generate a filename with unique md5(timestamp)!
		    $filename = md5(time()) . ".png";
		    // Save the file as the md5(timestamp) and save it as is.
			move_uploaded_file($_FILES["file"]["tmp_name"], $filename);
			// Return the full path URL to the user!
			print_r(HOST . $filename);
		}else{
			// Joke around with the random non-authenticated user(s).
			print_r(json_encode("Are you sure you are allowed to do that?"));
		}
	}else{
		// Joke around with the random non-authenticated user(s).
		print_r(json_encode("You got some serious problem, snooping into someone else's stuff!"));
	}

	exit();
?>
```

I prefer testing our my remote scripts before moving forward, I used a nifty yet handy tool, very essential to web developers named [Postman](https://www.getpostman.com). Amazing, what you can do with it.

[![Image](https://i.imgur.com/M2AkaE4.png)](https://i.imgur.com/M2AkaE4.png "Postman check"){:data-rel="lightcase"}

Now that we know our remote `upload.php` is working great, we shall now write a script to take a screenshot and upload the image to our server and retrieve the image URL, using both Python and Bash!

#### Python Script (For Linux systems, using gnome-screenshot)

`gnome-screenshot` is a great tool for any Linux users with gnome desktop environment. Arch-Linux had it built in therefore, I just had to simply execute the proper commands.

The ones, we'll be using for our Python scripts are -

1. Selected Area, `-a` flag.
2. Full screen, `-d` flag.
3. Current Window, `-w` flag.

If you already have `gnome-screenshot` installed, you can do `-h` or `--help` and read the accepted parameters.

[![Image](https://i.imgur.com/qH23kOG.png)](https://i.imgur.com/qH23kOG.png "gnome-screenshot -h"){:data-rel="lightcase"}

A python script to handle three parameter flags `-a`, `-d` and `-w` is given below -

```python
#	Document 		: CDN/cdnupload.py
#	Description		: An upload trigger for Linux systems.
#	Date 			: 2016-03-04
#	Copyright (c) Prashant M. Shrestha (www.prashant.me)

import requests
import sys
import time
import hashlib
import sys
import os.path
from subprocess import call

url 			= 'https://cdn.prashant.me/upload'
screenshotType	= sys.argv[2];
currentTime 	= str(time.time())
imageFilename	= hashlib.md5(currentTime.encode()).hexdigest() + '.png'

def gnomeScreenshot(sshotType, fName):
	if("-a" in sshotType):
		call(["gnome-screenshot", "-a", "-f", fName])
	elif("-d" in sshotType):
		call(["gnome-screenshot", "-f", fName])
	elif("-w" in sshotType):
		call(["gnome-screenshot", "-w", "-f", fName])

def sendRequest(files, datas):
	r = requests.post(url, files=files, data=datas)
	print(r.text)

gnomeScreenshot(screenshotType, imageFilename)

files 	= { 'file' : open(imageFilename, 'rb') }
auth	= { "securityKey" : "prashantmshrestha" }

sendRequest(files, auth)

call(["rm", "-rf", imageFilename])
```

Now that we have Python script to take screenshot and trigger upload, we can simply run it with -

```bash
python cdnupload.py -a # Take area screenshot & Upload
python cdnupload.py -w # Take current window's screenshot & Upload
python cdnupload.py -d # Take full desktop's screnshot & Upload
```

**(2016-03-22) Edit:** Those were the easy parts, what we need now is the protection so that only the owners/certain domain can access the images hosted in our server. I used `.htaccess` in order to achieve it and lock it to only one domain, `prashant.me`. Add the following after the `.htaccess` commands provided above.

```
#Lock To one domain.. 
RewriteCond %{HTTP_HOST} ^prashant.me RewriteRule ^/(.*).png$ [FL] 
```

This should do the trick, in order to check if it is working or not, just head over to some other domain and try embedding the image to the website. It isn't much but a lot of improvements and updates can be applied to this project, even though if you look at it as a small project.

The scripts have been added to my [Github](https://github.com/intern0t/Image-Hosting) repository therefore feel free to improve and upgrade.

#### Credits to [MemoryPointer](http://memorypointer.com/wp-content/uploads/2014/04/best-hosting-providers.jpg) for the server rack image.

Happy Coding!
