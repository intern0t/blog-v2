---
layout: post
title: "Signing Github Commits using GnuPG (GPG)."
author: Prashant Shrestha
date: 2018-10-29 19:25:27 +400
categories: security
tags: Linux signed commit GitHub git verified gpg security trusted
poster: https://static.goanywhere.com/images/products/mft/GoAnywhereMFT_OpenPGP-Diagram_web.png
---

[GnuPG (GPG)](https://www.gnupg.org/) is a command line tool to integrate standard implementation of [OpenPGP](https://www.openpgp.org/) to address an integrity of data which is also accepted by [Github](https://github.com) to verify the integrity of the source the commits are pushed from.

We have probably seen the **Verified** tag in commits at least once in Github repositories, green **Verified** tag in commit means the machine and the person who pushed the commit is actually the Github user (as associated in the account) and no-one else.
<!--excerpt-->

Before generating a new GPG key, it is imperative for a person to check if he/she already has an existing GPG key. They can do so by executing the following command in their terminal.

```bash
gpg --list-secret-keys --keyid-format LONG
```

#### Generate a new GPG key

Considering generating a new GPG key is pretty straightforward, we need to know that Github accepts GPG key of size `4096` bits. Another thing to take into consideration is the GPG's **version**, `gpg --version`. At the time of this writing, my versions of required libraries and modules were as follows.

```
gpg (GnuPG) 2.2.4
libgcrypt 1.8.1
```

1. Execute `gpg --full-generate-key` in your terminal.
2. Select default (1), `RSA and RSA (default)`.
3. Change keysize from default `3072` to `4096` bits.
4. Change validity for the time of your choice, I put mine to be `2y`, which means, valid for 2 years.
5. Rest of the prompts are pretty straightforward however the next prompt after **Real Name**, **Email address** is where we need to pay close attention. If you are using Github's private (anonymous) as your commit email with format of `username@users.noreply.github.com`, you need to enter that instead of your primary email. If not, it will show as **Unverified** on your commit signature.
6. Secure your key with a passphrase.
7. **Verify** that key is created using `gpg --list-secret-keys --keyid-format LONG` command.

[![Unverified Commit]({{ site.ph }}){:data-src="https://i.imgur.com/FWL3XNR.png" .lazy}](https://i.imgur.com/FWL3XNR.png){:data-rel="lightcase"}

You should see an output similar to this.

```
/home/scarecr0w/.gnupg/pubring.kbx
----------------------------------
sec   rsa4096/47E29D1BEAA33061 2018-10-28 [SC] [expires: 2020-10-27]
      1B77D86D64255B179FD5DDE747E29D1BEAA33061
uid   [ultimate] Prashant Shrestha (Anonymous Github Email GPG) <intern0t@users.noreply.github.com>
ssb   rsa4096/598E4AA9F1C7AE98 2018-10-28 [E] [expires: 2020-10-27]
```

Take note of the 3rd line, `rsa4096/47E29D1BEAA33061` where `47E29D1BEAA33061` is our public GPG key ID.

#### Generate a private key to use with Github

Once we have our GPG key ID, we now need to generate a private key that is accepted by Github to verify our GPG key ID which can be done so by the command below.

```bash
gpg --armor --export 47E29D1BEAA33061
```

Once it is done generating the private key, copy everything, including `-----BEGIN PGP PUBLIC KEY BLOCK-----` and `-----END PGP PUBLIC KEY BLOCK-----` and head over to Github's Personal Settings > [`SSH and GPG keys`](https://github.com/settings/keys) and add the block in there.

#### Creating Signed Commits

Creating signed commits requires a bit of a set up in the cloned repository directory. Head to the directory and let `git` know that we are going to be signing our commits using the following command.

```bash
git config --global user.signingkey 47E29D1BEAA33061
```

..or simply `git config user.signingkey 47E29D1BEAA33061` without `--global` parameter for repository specific GPG key.

To test, make some changes in your local copy of your repository and commit your changes using the `-S` flag.

```bash
git commit -S -am "Yay, signed message test."
```

If everything went well, your signed and verified commit in Github should look similar to this.

[![Verified Commit]({{ site.ph }}){:data-src="https://i.imgur.com/oDVZ2rv.png" .lazy}](https://i.imgur.com/oDVZ2rv.png){:data-rel="lightcase"}

Good Luck!

---

#### Credits

1. [Poster image](https://www.goanywhere.com/managed-file-transfer/encryption/gnupg-gpg) of encryption/decryption process used in this blog post to GoAnywhere.com
2. Github
3. GnuPG (GPG)
