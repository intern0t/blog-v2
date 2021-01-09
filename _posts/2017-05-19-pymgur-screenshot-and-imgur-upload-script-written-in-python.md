--- 
layout: post
title: "Pymgur - Yet another screenshot and Imgur upload script written in Python." 
author: Prashant Shrestha
permalink: "project/Pymgur"
date: 2017-05-19 05:06:05 -400
categories: development
tags: programming dev development python imgur upload screenshot capture
poster: https://i.imgur.com/7XoGM0k.jpg
---

After using Shutter for almost a year or more if I recall correctly, I got fed up of it's broken Imgur upload plugin, considering those upload plugins are written in Pearl Scripts `.pm` I guess I could have tried and edited the script. For those who aren't familiar with what Imgur is, it is an image host, free, fast, optimized, secure and very resourceful for image sharing. It started from Reddit and now it is one of the most amazing image hosts out there, probably the best if you ignore Google+ Photos.

It gives you an ability to edit/update images with various built-in sets of tools and features.

Nothing wrong with trying and creating one for yourself, I suppose. The script I wrote makes use of [Imgur's OAuth 2.0 authentication](https://apidocs.imgur.com/#authorization-and-oauth) using `pin` to authorize, confirm and revalidate `access_tokens`. 

All the steps are included in the Python script itself, therefore, I don't think the user will have much trouble configuring things around.
<!--excerpt-->
#### Install Required Python Packages & Other packages:

You need Python installed in order for Python script to run, it's a given. In addition, we make use of various Python libraries to make our scripting (running) easier. 

Install `Python`, `pip` and `xclip`. 

From Python's `pip` install `requests` and `json`. 

Once the installation process is complete, let's create a [SymLink](https://en.wikipedia.org/wiki/Symbolic_link) to our Python Script.

#### Creating a SymLink:

Creating SymLink is a very easy task, all we need to know is where to store our file securely and how to create a reference link for it, more like a pointer in `C++`, really! Download the `Pymgur.py` from the source or just copy paste the code and create a file in your system. I like to put the scripts I develop and use in a specific directory at `~/Documents/Scripts/` which is where I've mine `Pymgur.py` stored, easier to backup and easier to share.

Before we create a SymLink, let us give proper permission to our Python script using

```bash
sudo chmod +x Pymgur.py
```

Let's say Pymgur's full path is `~/Documents/Scripts/Pymgur.py`, head over to `/usr/local/bin` and enter this code to create a proper SymLink to your file.

```bash
sudo ln -s ~/Documents/Scripts/Pymgur.py
```

That should do it, go to some random directory and try `Pymgur.py` should work, if you set everything up.

#### Script:

The following Python script does not create a configuration file needed so we are going to have to create one ourselves. Our full package script consists of two files.

1. pymgur.conf
2. Pymgur.py

### Parameters and Arguments:

```bash
Pymgur.py -a # Capture Area.
Pymgur.py -d <seconds># Capture fullscreen with delay in seconds.
Pymgur.py -w # Capture Active Window.
Pymgur.py -w -d <seconds> # Capture Active window with delay in seconds.
Pymgur.py -c # Upload image from Clipboard to Imgur (direct)
```

### pymgur.conf

```json
{
    "client" : "Developed by Prashant Shrestha (https://prashant.me)",
    "saveTo" : "/home/scarecr0w/Pictures/Screenshots",
    "client_id" : "",
    "client_secret" : "",
    "pin" : "",
    "access_token" : "",
    "refresh_token" : ""
}
```

### Pymgur.py

```python
#!/usr/bin/python
# Document : Pymgur.py
# Description : Simple Image Screenshot tool for Linux, developed for Ubuntu.
# Date : 2017-05-18
# Copyright (c) Prashant Shrestha, https://prashant.me

# Required Libraries import for this script.
# To Install Python => (requests, json), System => (xclip)
import requests                     # pip install requests
import sys                          # To accept and retrieve the arguments
from time import gmtime, strftime   # Time formatting
import os                           # Save it to proper directory/path
import json                         # To make data (request/response) parsing job easier
from gi.repository import Gtk, Gdk

# Global Variables for later use.
imgurInfo = '/home/scarecr0w/Documents/Scripts/pymgur.json'
shotType = ""
imgurConf = {}
imageFileName = strftime("%a-%d-%b-%Y_%H:%M:%S", gmtime()) + ".png"
credit = [
    '===============================================',
    '__________                                     ',
    '\______   \___.__. _____    ____  __ _________ ',
    ' |     ___<   |  |/     \  / ___\|  |  \_  __ \'',
    ' |    |    \___  |  Y Y  \/ /_/  >  |  /|  | \/',
    ' |____|    / ____|__|_|  /\___  /|____/ |__|   ',
    '           \/          \//_____/               ',
    '==============================================='
]

# Load our imgur.conf (JSON formatted) file..
def loadConfigurations():
    with open(imgurInfo, 'r') as jsonData:
        data = json.load(jsonData)
        
        # Let's edit our variable's values from the *.conf file.
        imgurConf['client'] = data['client']
        imgurConf['client_id'] = data['client_id']
        imgurConf['client_secret'] = data['client_secret']
        imgurConf['pin'] = data['pin']
        imgurConf['access_token'] = data['access_token']
        imgurConf['refresh_token'] = data['refresh_token']
        imgurConf['saveTo'] = data['saveTo']

# Load the Configurations.
loadConfigurations()

# Print Credits - Prashant Shrestha (Don't remove!)
print('\n'.join(credit))
print(imgurConf['client'] + '\n')

# Check if our screenshot directory exists.
if not os.path.isdir(imgurConf['saveTo']):
    os.makedirs(imgurConf['saveTo'])

# Function to process our screenshot.
def takeScreenshot(screenshotType, fileName):
    if("-a" in screenshotType):
        # Take area screenshot.
        os.system("gnome-screenshot -a -f " + fileName)
    elif("-d" in screenshotType):
        # Add a delay to the screenshot.
        if(len(sys.argv) > 2):
            os.system("gnome-screenshot -d " + sys.argv[2] + " -f " + fileName)
        else:
            print("-d parameter takes one more argument in seconds. python Pymgur.py -d 5 where 5 = seconds.")
    elif("-w" in screenshotType):
        # Take a screenshot of an active window.
        if(len(sys.argv) > 3):
            # If -d parameter & argument is provided, execute accordingly.
            os.system("gnome-screenshot -w -d " + sys.argv[3] + " -f " + fileName)
        elif(len(sys.argv) > 1):
            # Just the -w parameter provided, simply take the screenshot.
            os.system("gnome-screenshot -w -f " + fileName)
        else:
            print("You can add delay to -w by -d <seconds>. Example : python Pymgur.py -w -d 3")
    elif("-c" in screenshotType):
        # Simple Imgur Upload for existing image file, thought of this feature little too late.
        # Check if file exists -> Add it to our imageFilePath -> Push it to Imgur.
        os.system("xclip -selection clipboard -t image/png -o > " + fileName)
    else:
        print("Please provide -a (Area), -d (Delay in *provided time, seconds), -w (Active Window) and -u (Upload existing file, provide proper image file path).\n");


# 4 Steps (Imgur Upload)
# Registration -> Authorization -> Requesting (Using Tokens) -> Refreshing Tokens.
#   Done             
def imgurProcessingPreparation():
    # Registration Process. (Step 1/4)
    registerAppURL = "https://api.imgur.com/oauth2/addclient"

    if(len(imgurConf['client_id']) > 0 and len(imgurConf['client_secret']) > 0):
        # Authorization Process. (Step 2/4)
        if(len(imgurConf['pin']) > 0):
            # PIN Exists, check for access_token & refresh_token.
            if(len(imgurConf['access_token']) > 0 and len(imgurConf['refresh_token']) > 0):
                # Access token & Refresh token both exists, upload the file, make the Upload request.
                print("OK!")
            else:
                # Access token & Refresh token doesn't exist, fetch 'em.
                fetchTokenURL = "https://api.imgur.com/oauth2/token"
                fetchTokenPayload = {
                    'client_id' : imgurConf['client_id'],
                    'client_secret' : imgurConf['client_secret'],
                    'grant_type' : 'pin',
                    'pin' : imgurConf['pin']
                }
                
                # Request an access_token and refresh_token from the Imgur /token endpoint & set the values.
                req = requests.post(fetchTokenURL, fetchTokenPayload)
                tokenAPIResponse = json.loads(req.text)

                # Notify the user about updating *.conf file with newly acquired access_token & refresh_token.
                print("Please update {} file with newly fetched data. {}".format(imgurInfo, tokenAPIResponse))
        else:
            # NO PIN!
            authURL = "https://api.imgur.com/oauth2/authorize?client_id={}&response_type={}&state={}".format(imgurConf['client_id'], 'pin', 'authorized')
            print("We need you to authorize Pymgur access your Imgur Application you just created. Go to {} and get the PIN provided and store it in '{}' file.".format(authURL, imgurInfo))
    else:
        # Navigate him to Application Registration page.
        print("Please go to (Imgur Application Registration) {} page and note the client_id & client_secret.".format(registerAppURL))

def UpdateToken():
    refreshTokenAPI = "https://api.imgur.com/oauth2/token"
    refreshTokenPayload = {
        'refresh_token' : imgurConf['refresh_token'], 
        'client_id' : imgurConf['client_id'],
        'client_secret' : imgurConf['client_secret'],
        'grant_type' : 'refresh_token' }
    
    req = requests.post(refreshTokenAPI, refreshTokenPayload)
    refreshTokenResponse = req.text
    print(refreshTokenResponse)
    

# Function to push our image to Imgur.
def pushToImgur(filePath):
    # We could use CURL to avoid installing multiple Python libraries, I suppose! For now let's use Requests.
    # Get proper Imgur API access. (If not needed, the user will be notified with OK! message)
    imgurProcessingPreparation()
    
    # Upload the image to Imgur. Make the upload request. (Step 3/4)
    # Header - Authorization: Bearer YOUR_ACCESS_TOKEN

    imageUploadAPI = "https://api.imgur.com/3/upload"
    imageUploadPayload = {'image' : open(filePath, 'rb').read() }
    imageUploadHeaders = {'Authorization' : 'Bearer {}'.format(imgurConf['access_token']) }

    req = requests.post(imageUploadAPI, data=imageUploadPayload, headers=imageUploadHeaders)
    imageUploadResponse = json.loads(req.text)

    if(imageUploadResponse['status'] == 200 and imageUploadResponse['success'] == True):
        toUser = {}
        toUser['link'] = imageUploadResponse['data']['link']
        toUser['deletehash'] = imageUploadResponse['data']['deletehash']
        toUser['type'] = imageUploadResponse['data']['type']
        toUser['size'] = imageUploadResponse['data']['size']
        toUser['account_id'] = imageUploadResponse['data']['account_id']
        toUser['datetime'] = imageUploadResponse['data']['datetime']

        os.popen('echo "{}" | xclip -selection clipboard'.format(toUser['link']))
        os.system("notify-send '{}' '{}'".format("Pymgur - Successful", toUser['link']))
        print(json.dumps(toUser))
        print("The direct Imgur URL has been copied to your clipboard. Paste away!")
    else:
        print("Sorry! There was a problem uploading your image file. ;(")
        UpdateToken()

# Check screenshot type : whether -a,-d,-w exists.
if(len(sys.argv) > 1):
    shotType = sys.argv[1]

# Take a screenshot & save it in our directory path.
# Fix our extended image path.
absoluteImagePath = os.path.join(imgurConf['saveTo'], imageFileName)
takeScreenshot(shotType, absoluteImagePath)

# Check if the image file exists, just for verification purposes.
if(os.path.exists(absoluteImagePath) and os.path.isfile(absoluteImagePath)):
    # Looks good, push it to Imgur.
    print("Saved the image to : " + absoluteImagePath)
    # Compress the PNG images to save bandwidth.
    os.system("optipng " + absoluteImagePath)
    pushToImgur(absoluteImagePath)
```


[Access via. Repo.](https://bitbucket.org/intern0t/scripts/raw/36715594478ded52426240fdd035993f2f8d7b01/Pymgur.py)

#### Preparation

If you are unsure what values go in the configuration file, run the script, it'll guide you through. Re-run the script to get prompted with different steps, keep an eye out on your terminal.

#### Screenshots

[![Image](https://i.imgur.com/dT0zp6n.png)](https://i.imgur.com/dT0zp6n.png){:data-rel="lightcase"}

[![Image](https://i.imgur.com/NMXj90S.png)](https://i.imgur.com/NMXj90S.png){:data-rel="lightcase"}

Improvements: This script can definitely be improved for ease-of-use and multiple other things, feel free to do so. Do let me know if you improve it, I would definitely want to give it a test.

#### Changes

1. **(Wed Jun 28 05:40:43 EDT 2017)** Added `-c` parameter to upload via. clipboard. (Requires [xclip](https://github.com/astrand/xclip) installed)
2. **(Wed Jun 28 05:40:43 EDT 2017)** Added auto image optimization before upload to save bandwidth. (Requires [optipng](http://optipng.sourceforge.net) installed)

Enjoy and Happy Coding.
