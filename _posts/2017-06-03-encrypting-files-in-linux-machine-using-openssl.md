---
layout: post
title:  "Encrypting files in Linux machine using OpenSSL."
author: Prashant Shrestha
date:   2017-06-03 04:18:33 -400
categories: development
tags: setup server private php python upload postman api
poster: https://i.imgur.com/c5sYvz7.jpg
---

What my **Project FileSec** did can be done straight from terminal which is quite nice to hear but CLI isn\'t for everyone, honestly respect their preference however. I am currently using [Ubuntu 17.04](http://releases.ubuntu.com/17.04/) as my main work-space therefore **OpenSSL** is available through official repository.

Install it using `sudo apt install openssl`.

The commands are pretty straightforward for `OpenSSL` which can also be reviewed using `man openssl` in your terminal. Basically, in order to simply encrypt or decrypt a file, we can make use of `-e` or `-d` parameters. Couple examples to easily understand what I am trying to say is shown below.

First, let us create a file which holds secret text/string/data and what not.

```bash
echo 'This is my secret string.' >> secret.txt
```

Verify whether the `secret.txt` file was created and the string was successfully appended to our secret file. Once verified, run `openssl aes-256-cbc -e -in secret.txt -out secret.txt.enc` in your terminal where you created your `secret.txt` file.
<!--excerpt-->
Once the encryption command using AES 256 CBC is executed and completed, you should see an output file with the same name as `secret.txt` but `.enc` in the end. The reason I do this is to keep track of file extensions during the encryption, once again, personal preference! `-out <output_file_name>`, hence you can set the output filename to whatever you want. For small files like `secret.txt`, we don't necessarily need to use `aes-256-cbc` as `aes-128-cbc` works faster `openssl aes-128-cbc -e -in secret.txt -out secret.txt.enc`.

You can test their performance and completion timing yourself using `time` command in front of your main encryption/decryption commands.

```bash
time openssl aes-128-cbc -e -in secret.txt -out secret.txt.enc -pass pass:prashantme
```

```bash
time openssl aes-256-cbc -e -in secret.txt -out secret.txt.enc -pass pass:prashantme
```

[![Image](https://i.imgur.com/fSZXaYA.png)](https://i.imgur.com/fSZXaYA.png "Timing the command execution."){:data-rel="lightcase"}

Comparison AES-256-CBC vs. AES-128-CBC `0.001 second` and -`9 seconds` difference on `AES-256-CBC` compared to `AES-128-CBC`. I would still go with `256` Bits just because of the `3n` layer encryption.

#### Python Script

So yeah, yet another tiny Python script to make my life easier. I definitely have couple ideas running in my mind for this particular script, let us see what happens in the future. What this script does is simplifies this complex `openssl` command into short and sweet command. If we take above codes as an example, `openssl aes-256-cbc -e -in secret.txt -out secret.txt.enc -pass pass:prashantme` becomes `FileSec.py -e/-d secret.txt/secret.txt.enc prashantme`. Simple, isn't it?

```python
#!/usr/bin/python
# Document : FileSec.py
# Description : A simple script to bundle the lengthy OpenSSL command in Linux to encrypt files using OpenSSL AES 256 CBC encryption.
# Date : 2017-06-02
# Copyright (c) Prashant Shrestha, https://prashant.me

# Import required modules.
import sys                          # To accept and retrieve the arguments
from time import gmtime, strftime   # Time formatting
import os                           # Save it to proper directory/path

# checkPath function takes in encrypted or to-encrypt file path and returns boolean, accordingly, if exists.
def checkPath(filePath):
    if not os.path.isfile(filePath):
        return False
    else:
        return True

# Handles everything, from handling arguments/parameters availability to actual encryption and decryption of a file.
def getPrompts(promptType):
    if ("-e" in promptType):
        if (len(sys.argv) < 3):
            print("Please provide python FileSec.py -e <file_path> <encryption_key>")
        else:
            # Proceed to check for valid file path.
            if(checkPath(sys.argv[2]) is True):
                # Let's check if the Encryption key is provided.
                if(len(sys.argv) < 4):
                    print("Please provide Encryption key to use for this file's encryption.")
                else:
                    # Prepare an encryption statement using AES 256 CBC (Slow but most secure).
                    encryptStatement = "openssl aes-256-cbc -e -in {} -out {}.enc -pass pass:{}".format(sys.argv[2], sys.argv[2], sys.argv[3])
                    
                    try:
                        # Execute our encryption statement.
                        os.system(encryptStatement)
                    except OSError as err:
                        print(err)
            else:
                print("The file path you provided (" + sys.argv[2] + ") is not file or does not exist.")
    elif ("-d" in promptType):
        if (len(sys.argv) < 3):
            print("Please provide python FileSec.py -d <file_path> <decryption_key>")
        else:
            # Proceed to check for valid file path.
            if(checkPath(sys.argv[2]) is True):
                # Let's check if the Decryption key is provided.
                if(len(sys.argv) < 4):
                    print("Please provide Decryption key to use for this file's decryption.")
                else:
                    # Prepare a decryption statement using AES 256 CBC (Slow but most secure).
                    decryptStatement = "openssl aes-256-cbc -d -in {} -out {} -pass pass:{}".format(sys.argv[2], sys.argv[2].replace(".enc", ""), sys.argv[3])
                    
                    try:
                        # Execute our decryption statement.
                        os.system(decryptStatement)
                    except OSError as err:
                        print(err)
            else:
                print("The file path you provided (" + sys.argv[2] + ") is not file or does not exist.")

# Check if the required parameters are provided for initial startup.
if(len(sys.argv) > 1):
    getPrompts(sys.argv[1])
else:
    print("Please provide -e or -d (Encryption or Decryption) parameters.")
```

You can create a Symlink for this file which allows the user to run `FileSec.py` from anywhere. First of all, allow the `.py` file execution permission using `sudo chmod +x FileSec.py`. Creating Symlink is very easy, head over to `/usr/local/bin` and type this command in your terminal.

```bash
ln -s /Path/to/FileSec.py .
```

Now you can call and encrypt your files from wherever you want.

## Using FileSec.py

I tried my best to write this script to make my life/work easier, without all key file, cipher, IV keys and such. Instead, I had a mindset of how big of a file will I be encrypting, the consistency of encryption and how often will I be encrypting/decrypting my files. Using `FileSec.py` is as simple as I could write.

```bash
FileSec.py -e secret.txt key
FileSec.py -d secret.txt.enc key
```

It uses 256 bits and `cbc` encryption by default which you can change if you prefer 128. I knowingly decided **not** to remove the original copy of the file, things could go south in an instant but this way, the user can check and verify and remove the original copy if necessary.

[![Image](https://i.imgur.com/ECrDhnN.png)](https://i.imgur.com/ECrDhnN.png "In action!"){:data-rel="lightcase"}

Enjoy.

#### Credits: Blog Image - [d.ibtimes](https://d.ibtimes.co.uk/en/full/1508674/encryption.jpg).