---
layout: post
title:  "Private Internet Access OVPN config edits for OpenVPN connection."
author: Prashant Shrestha
date:   2025-12-21 16:32:23 -400
categories: server
tags: client openvpn private-internet-access vpn ovpn
# poster: https://i.imgur.com/k28EhRc.jpg
words: 2735
---

For whatever reason, Private Internet Access client wasn't providing me with reliable connection. I downloaded the VPN profiles and tried to manually connect via. OpenVPN client using CLI but it was throwing some weird errors related to certificate validations. After few research, I found out that we need to remove `crl-verify` section, and replace `compress` with simply `comp-lzo no`.

#### Downloading OpenVPN `.ovpn` profiles for P.I.A.

1. Head over to the [downloads section](https://www.privateinternetaccess.com/account/client-control-panel#downloads) of P.I.A after logging in.
2. Scroll to the bottom towards the **VPN Settings** section > **OpenVPN Configurations** and download the [configuration files](https://www.privateinternetaccess.com/openvpn/openvpn.zip).
3. Uncompress the profiles wherever you want, I've it stored at `/Users/pms/Downloads/openvpn-strong`.

#### Editing the `.ovpn` files.

1. Replace all occurances of `compress` with `comp-lzo no`.
    ```bash
    sed -i -e 's/compress/comp-lzo no/g' *.ovpn
   ```
2. Replace all occurances of `<crl-verify>` block.
    ```bash
    sed -i -e 's/"<crl-verify>                              
    -----BEGIN X509 CRL-----
    MIIDWDCCAUAwDQYJKoZIhvcNAQENBQAwgegxCzAJBgNVBAYTAlVTMQswCQYDVQQI
    EwJDQTETMBEGA1UEBxMKTG9zQW5nZWxlczEgMB4GA1UEChMXUHJpdmF0ZSBJbnRl
    cm5ldCBBY2Nlc3MxIDAeBgNVBAsTF1ByaXZhdGUgSW50ZXJuZXQgQWNjZXNzMSAw
    HgYDVQQDExdQcml2YXRlIEludGVybmV0IEFjY2VzczEgMB4GA1UEKRMXUHJpdmF0
    ZSBJbnRlcm5ldCBBY2Nlc3MxLzAtBgkqhkiG9w0BCQEWIHNlY3VyZUBwcml2YXRl
    aW50ZXJuZXRhY2Nlc3MuY29tFw0xNjA3MDgxOTAwNDZaFw0zNjA3MDMxOTAwNDZa
    MCYwEQIBARcMMTYwNzA4MTkwMDQ2MBECAQYXDDE2MDcwODE5MDA0NjANBgkqhkiG
    9w0BAQ0FAAOCAgEAppFfEpGsasjB1QgJcosGpzbf2kfRhM84o2TlqY1ua+Gi5TMd
    KydA3LJcNTjlI9a0TYAJfeRX5IkpoglSUuHuJgXhP3nEvX10mjXDpcu/YvM8TdE5
    JV2+EGqZ80kFtBeOq94WcpiVKFTR4fO+VkOK9zwspFfb1cNs9rHvgJ1QMkRUF8Pp
    LN6AkntHY0+6DnigtSaKqldqjKTDTv2OeH3nPoh80SGrt0oCOmYKfWTJGpggMGKv
    IdvU3vH9+EuILZKKIskt+1dwdfA5Bkz1GLmiQG7+9ZZBQUjBG9Dos4hfX/rwJ3eU
    8oUIm4WoTz9rb71SOEuUUjP5NPy9HNx2vx+cVvLsTF4ZDZaUztW9o9JmIURDtbey
    qxuHN3prlPWB6aj73IIm2dsDQvs3XXwRIxs8NwLbJ6CyEuvEOVCskdM8rdADWx1J
    0lRNlOJ0Z8ieLLEmYAA834VN1SboB6wJIAPxQU3rcBhXqO9y8aa2oRMg8NxZ5gr+
    PnKVMqag1x0IxbIgLxtkXQvxXxQHEMSODzvcOfK/nBRBsqTj30P+R87sU8titOox
    NeRnBDRNhdEy/QGAqGh62ShPpQUCJdnKRiRTjnil9hMQHevoSuFKeEMO30FQL7BZ
    yo37GFU+q1WPCplVZgCP9hC8Rn5K2+f6KLFo5bhtowSmu+GY1yZtg+RTtsA=
    -----END X509 CRL-----
    </crl-verify>"//g' *.ovpn
    ```
3. Create `auth` file.
   ```bash
   cat > auth
   <username>
   <password>
   ```
4. Replace `auth` file in all configs to utilize the same credentials.
   ```bash
   sed -i -e 's/auth-user-pass/auth-user-pass auth/g' *.ovpn
   ```

#### Connect to the VPN using `.ovpn-e` file.

```bash
sudo openvpn --config us_atlanta.ovpn-e
```

```bash
sudo openvpn --config us_atlanta.ovpn --auth-user-pass auth
```

{% include lightcase.html name="Screenshot 2025-12-21 at 16.55.56.png" alt="Successfully connected to the PIA VPN using OVPN profile." local="true" %}

:smiley: