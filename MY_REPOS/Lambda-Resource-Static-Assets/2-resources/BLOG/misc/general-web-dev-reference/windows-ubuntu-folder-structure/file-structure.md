> # - _bryan@LAPTOP-9LGJ3JGS[:/$]([https://www.lifewire.com/what-is-a-root-folder-or-root-directory-2625989]) tree -L 1 -d_


 
## ROOT DIRECTORY
            ◎
            ├── bin -> usr/bin
            ├── boot
            ├── dev
            ├── etc
            ├── home
            ├── lib -> usr/lib
            ├── lib32 -> usr/lib32
            ├── lib64 -> usr/lib64
            ├── libx32 -> usr/libx32
            ├── media
            ├── mnt
            ├── opt
            ├── proc
            ├── root
            ├── run
            ├── sbin -> usr/sbin
            ├── snap
            ├── srv
            ├── sys
            ├── tmp
            ├── usr
            └── var
    

    

<center>

![picture 4](../images/96c6f1e911569a4276e47583a2ab9c7d2dfb810bf656c2d0328ad350b8a48d8b.png)  

</center>

```
| drwxrwxrwx  1   |   root root | 4096 Nov 22 17:37 ./  |                       |
| drwxrwxrwx  1  -|  -root root | 4096 Nov 22 17:37 ../ |                       |
> | lrwxrwxrwx  1   |   root root | 7 Aug  4 17:39        | bin -> usr/bin/       |
| drwxrwxrwx  1   |   root root | 4096 Aug  4 17:47     | boot/                 |
| drwxrwxrwx  1   |   root root | 4096 Nov 25 02:52     | dev/                  |
| drwxrwxrwx  1   |   root root | 4096 Nov 25 02:10     | etc/                  |
| drwxrwxrwx  1   |   root root | 4096 Nov 22 17:38     | home/                 |
| -rwxrwxrwx  1   |   root root | 631968 Dec  7  2019   | init*                 |


> | lrwxrwxrwx  1   |   root root | 7 Aug  4 17:39        | lib |  -> usr/  |lib/       |
> | lrwxrwxrwx  1   |   root root | 9 Aug  4 17:39        | lib32 |  -> usr/  |lib32/   |
> | lrwxrwxrwx  1   |   root root | 9 Aug  4 17:39        | lib64 |  -> usr/  |lib64/   |
> | lrwxrwxrwx  1   |   root root | 10 Aug  4 17:39       | libx32 |  -> usr/  |libx32/ |


| drwxrwxrwx  1   |   root root | 4096 Aug  4 17:39     | media/                |
| drwxrwxrwx  1   |   root root | 4096 Nov 22 17:37     | mnt/                  |
| drwxr-xr-x  1   |   root root | 4096 Aug  4 17:39     | opt/                  |
| dr-xr-xr-x 12   |   root root | 0 Nov 25 01:53        | proc/                 |
| drwx------  1   |   root root | 4096 Aug  4 17:42     | root/                 |
| drwxr-xr-x  1   |   root root | 4096 Nov 25 01:54     | run/                  |
> | lrwxrwxrwx  1   |   root root | 8 Aug  4 17:39        | sbin -> usr/sbin/     |
| drwxr-xr-x  1   |   root root | 4096 Jul 10 09:59     | snap/                 |
| drwxr-xr-x  1   |   root root | 4096 Aug  4 17:39     | srv/                  |
| dr-xr-xr-x 12   |   root root | 0 Nov 25 01:53        | sys/                  |
| drwxrwxrwt  1   |   root root | 4096 Nov 25 02:52     | tmp/                  |
| drwxr-xr-x  1   |   root root | 4096 Aug  4 17:40     | usr/                  |
| drwxr-xr-x  1   |   root root | 4096 Aug  4 17:42     | var/                  |

```



bryan@LAPTOP-9LGJ3JGS:/$ tree -L 1 -d
.
├── bin -> usr/bin
├── boot
├── dev
├── etc
├── home
├── lib -> usr/lib
├── lib32 -> usr/lib32
├── lib64 -> usr/lib64
├── libx32 -> usr/libx32
├── media
├── mnt
├── opt
├── proc
├── root
├── run
├── sbin -> usr/sbin
├── snap
├── srv
├── sys
├── tmp
├── usr
└── var

22 directories

------

<==_______________________________________ (bryan@LAPTOP-9LGJ3JGS:/$ tree -L 2 -d -R) ______________________________________==>

------

.
├── bin -> usr/bin
├── boot
├── dev
│   ├── block
│   ├── fd -> /proc/self/fd
│   ├── pts
│   └── shm -> /run/shm
├── etc
│   ├── NetworkManager
│   ├── PackageKit
│   ├── X11
│   ├── alternatives
│   ├── apache2
│   ├── apparmor
│   ├── apparmor.d
│   ├── apport
│   ├── apt
│   ├── bash_completion.d
│   ├── binfmt.d
│   ├── byobu
│   ├── ca-certificates
│   ├── calendar
│   ├── cloud
│   ├── console-setup
│   ├── cron.d
│   ├── cron.daily
│   ├── cron.hourly
│   ├── cron.monthly
│   ├── cron.weekly
│   ├── cryptsetup-initramfs
│   ├── dbus-1
│   ├── dconf
│   ├── default
│   ├── depmod.d
│   ├── dhcp
│   ├── dpkg
│   ├── fonts
│   ├── fwupd
│   ├── groff
│   ├── gss
│   ├── init.d
│   ├── initramfs-tools
│   ├── iproute2
│   ├── iscsi
│   ├── kernel
│   ├── landscape
│   ├── ld.so.conf.d
│   ├── ldap
│   ├── lighttpd
│   ├── logcheck
│   ├── logrotate.d
│   ├── lvm
│   ├── mdadm
│   ├── modprobe.d
│   ├── modules-load.d
│   ├── netplan
│   ├── network
│   ├── networkd-dispatcher
│   ├── newt
│   ├── opt
│   ├── pam.d
│   ├── perl
│   ├── pki
│   ├── pm
│   ├── polkit-1
│   ├── pollinate
│   ├── profile.d
│   ├── pulse
│   ├── python2.7
│   ├── python3
│   ├── python3.8
│   ├── rc0.d
│   ├── rc1.d
│   ├── rc2.d
│   ├── rc3.d
│   ├── rc4.d
│   ├── rc5.d
│   ├── rc6.d
│   ├── rcS.d
│   ├── rsyslog.d
│   ├── security
│   ├── selinux
│   ├── sensors.d
│   ├── skel
│   ├── sos
│   ├── ssh
│   ├── ssl
│   ├── sudoers.d
│   ├── sysctl.d
│   ├── systemd
│   ├── terminfo
│   ├── tmpfiles.d
│   ├── ubuntu-advantage
│   ├── udev
│   ├── ufw
│   ├── update-manager
│   ├── update-motd.d
│   ├── update-notifier
│   ├── vim
│   ├── vmware-tools
│   ├── vulkan
│   └── xdg
├── home
│   └── bryan
├── lib -> usr/lib
├── lib32 -> usr/lib32
├── lib64 -> usr/lib64
├── libx32 -> usr/libx32
├── media
├── mnt
│   └── c
├── opt
├── proc
│   ├── 1
│   ├── 1362
│   ├── 1363
│   ├── 1594
│   ├── bus
│   ├── net -> self/net
│   ├── self -> 1594
│   ├── sys
│   └── tty
├── root [error opening dir]
├── run
│   ├── lock
│   ├── mount
│   ├── resolvconf
│   ├── shm
│   ├── sudo
│   └── user
├── sbin -> usr/sbin
├── snap
├── srv
├── sys
│   ├── block
│   ├── bus
│   ├── class
│   ├── dev
│   ├── devices
│   ├── firmware
│   ├── fs
│   ├── kernel
│   ├── module
│   └── power
├── tmp
│   ├── apt-dpkg-install-j6iPdt
│   └── vscode-typescript1000
├── usr
│   ├── bin
│   ├── games
│   ├── include
│   ├── lib
│   ├── lib32
│   ├── lib64
│   ├── libexec
│   ├── libx32
│   ├── local
│   ├── sbin
│   ├── share
│   └── src
└── var
    ├── backups
    ├── cache
    ├── crash
    ├── lib
    ├── local
    ├── lock -> /run/lock
    ├── log
    ├── mail
    ├── opt
    ├── run -> /run
    ├── snap
    ├── spool
    └── tmp

174 directories


------

<==_______________________________________ bryan@LAPTOP-9LGJ3JGS:/mnt/c$ tree -L 2 -d -R() ______________________________________==>

------


.
└── c
    ├── $Recycle.Bin
    ├── $SysReset
    ├── Documents and Settings -> /mnt/c/Users
    ├── FreeOCR
    ├── Intel
    ├── OneDriveTemp
    ├── PerfLogs
    ├── Program Files
    ├── Program Files (x86)
    ├── ProgramData
    ├── Recovery
    ├── System Volume Information
    ├── Users
    └── Windows

15 directories







.
├── $Recycle.Bin
│   ├── S-1-5-18
│   ├── S-1-5-21-4213827891-1127881403-2801345711-1000
│   └── S-1-5-21-4213827891-1127881403-2801345711-1001
├── $SysReset
│   ├── AppxLogs
│   ├── Logs
│   ├── MDM
│   └── Scratch
├── Documents and Settings -> /mnt/c/Users
├── FreeOCR
│   ├── Tesseract docs
│   └── tessdata
├── Intel
│   └── GfxCPLBatchFiles
├── OneDriveTemp
│   └── S-1-5-21-4213827891-1127881403-2801345711-1001
├── PerfLogs [error opening dir]
├── Program Files
│   ├── Common Files
│   ├── Google
│   ├── Intel
│   ├── Internet Explorer
│   ├── Lenovo
│   ├── MSBuild
│   ├── Microsoft Office
│   ├── Microsoft Office 15
│   ├── ModifiableWindowsApps
│   ├── Mythicsoft
│   ├── Reference Assemblies
│   ├── Uninstall Information
│   ├── Update Services
│   ├── Windows Defender
│   ├── Windows Defender Advanced Threat Protection
│   ├── Windows Mail
│   ├── Windows Media Player
│   ├── Windows Multimedia Platform
│   ├── Windows NT
│   ├── Windows Photo Viewer
│   ├── Windows Portable Devices
│   ├── Windows Security
│   ├── Windows Sidebar
│   ├── WindowsApps
│   └── WindowsPowerShell
├── Program Files (x86)
│   ├── Common Files
│   ├── Google
│   ├── Intel
│   ├── Internet Explorer
│   ├── Lenovo
│   ├── MSBuild
│   ├── Microsoft
│   ├── Microsoft.NET
│   ├── Reference Assemblies
│   ├── Vim
│   ├── Windows Defender
│   ├── Windows Mail
│   ├── Windows Media Player
│   ├── Windows Multimedia Platform
│   ├── Windows NT
│   ├── Windows Photo Viewer
│   ├── Windows Portable Devices
│   ├── Windows Sidebar
│   └── WindowsPowerShell
├── ProgramData
│   ├── Application Data -> /mnt/c/ProgramData
│   ├── Desktop -> /mnt/c/Users/Public/Desktop
│   ├── Documents -> /mnt/c/Users/Public/Documents
│   ├── Dolby
│   ├── FibocomLog
│   ├── Intel
│   ├── Lenovo
│   ├── Microsoft
│   ├── Microsoft OneDrive
│   ├── Package Cache
│   ├── Packages
│   ├── Roaming
│   ├── SoftwareDistribution
│   ├── Start Menu -> /mnt/c/ProgramData/Microsoft/Windows/Start Menu
│   ├── Templates -> /mnt/c/ProgramData/Microsoft/Windows/Templates
│   ├── USOPrivate
│   ├── USOShared
│   ├── WindowsHolographicDevices
│   ├── regid.1991-06.com.microsoft
│   └── ssh
├── Recovery [error opening dir]
├── System Volume Information [error opening dir]
├── Users
│   ├── All Users -> /mnt/c/ProgramData
│   ├── Default
│   ├── Default User -> /mnt/c/Users/Default
│   ├── DevToolsUser
│   ├── Public
│   └── bryan
└── Windows
    ├── ADFS
    ├── AppReadiness
    ├── BitLockerDiscoveryVolumeContents
    ├── Boot
    ├── Branding
    ├── CSC
    ├── CbsTemp
    ├── Containers
    ├── Cursors
    ├── DiagTrack
    ├── DigitalLocker
    ├── Downloaded Program Files
    ├── ELAMBKUP
    ├── Firmware
    ├── Fonts
    ├── GameBarPresenceWriter
    ├── Globalization
    ├── Help
    ├── IME
    ├── INF
    ├── IdentityCRL
    ├── ImmersiveControlPanel
    ├── InputMethod
    ├── Installer
    ├── L2Schemas
    ├── LanguageOverlayCache
    ├── Lenovo
    ├── LiveKernelReports
    ├── Logs
    ├── Media
    ├── Microsoft.NET
    ├── Migration
    ├── ModemLogs
    ├── OCR
    ├── Offline Web Pages
    ├── PLA
    ├── Panther
    ├── Performance
    ├── PolicyDefinitions
    ├── Prefetch
    ├── PrintDialog
    ├── Provisioning
    ├── Registration
    ├── RemotePackages
    ├── Resources
    ├── SKB
    ├── SchCache
    ├── ServiceProfiles
    ├── ServiceState
    ├── Setup
    ├── ShellComponents
    ├── ShellExperiences
    ├── SoftwareDistribution
    ├── Speech
    ├── Speech_OneCore
    ├── SysWOW64
    ├── System
    ├── System32
    ├── SystemApps
    ├── SystemResources
    ├── TAPI
    ├── Tasks
    ├── Temp
    ├── TempInst
    ├── Vss
    ├── WaaS
    ├── Web
    ├── WebManagement
    ├── WinSxS
    ├── addins
    ├── appcompat
    ├── apppatch
    ├── assembly
    ├── bcastdvr
    ├── debug
    ├── diagnostics
    ├── en-GB
    ├── en-US
    ├── rescache
    ├── schemas
    ├── security
    ├── servicing
    ├── tracing
    └── twain_32

179 directories
bryan@LAPTOP-9LGJ3JGS:/mnt/c$


------

<==_______________________________________ (bryan@LAPTOP-9LGJ3JGS:/mnt/c/Users$ tree -L 2 -d -R) ______________________________________==>

------

.
├── All Users -> /mnt/c/ProgramData
├── Default
│   └── AppData
├── Default User -> /mnt/c/Users/Default
├── DevToolsUser [error opening dir]
├── Public
│   ├── AccountPictures
│   ├── Desktop
│   ├── Documents
│   ├── Downloads
│   ├── Libraries
│   ├── Music
│   ├── Pictures
│   ├── Roaming
│   └── Videos
└── bryan
    ├── 3D Objects
    ├── AppData
    ├── Application Data -> /mnt/c/Users/bryan/AppData/Roaming
    ├── Contacts
    ├── Cookies -> /mnt/c/Users/bryan/AppData/Local/Microsoft/Windows/INetCookies
    ├── Documents
    ├── Downloads
    ├── Favorites
    ├── IntelGraphicsProfiles
    ├── Links
    ├── Local Settings -> /mnt/c/Users/bryan/AppData/Local
    ├── Music
    ├── My Documents -> /mnt/c/Users/bryan/Documents
    ├── NetHood -> /mnt/c/Users/bryan/AppData/Roaming/Microsoft/Windows/Network Shortcuts
    ├── OneDrive
    ├── PrintHood -> /mnt/c/Users/bryan/AppData/Roaming/Microsoft/Windows/Printer Shortcuts
    ├── Recent -> /mnt/c/Users/bryan/AppData/Roaming/Microsoft/Windows/Recent
    ├── Roaming
    ├── Saved Games
    ├── Searches
    ├── SendTo -> /mnt/c/Users/bryan/AppData/Roaming/Microsoft/Windows/SendTo
    ├── Start Menu -> /mnt/c/Users/bryan/AppData/Roaming/Microsoft/Windows/Start Menu
    ├── Templates -> /mnt/c/Users/bryan/AppData/Roaming/Microsoft/Windows/Templates
    ├── Videos
    └── vimfiles

41 directories
bryan@LAPTOP-9LGJ3JGS:/mnt/c/Users$



------

<==_______________________________________ (bryan@LAPTOP-9LGJ3JGS:/mnt/c/Users/bryan$ tree -L 2 -d -R) ______________________________________==>

------

bryan@LAPTOP-9LGJ3JGS:/mnt/c/Users$ cd bryan/

.
├── 3D Objects
├── AppData
│   ├── Local
│   ├── LocalLow
│   └── Roaming
├── Application Data -> /mnt/c/Users/bryan/AppData/Roaming
├── Contacts
├── Cookies -> /mnt/c/Users/bryan/AppData/Local/Microsoft/Windows/INetCookies
├── Documents
│   ├── My Music -> /mnt/c/Users/bryan/Music
│   └── My Videos -> /mnt/c/Users/bryan/Videos
├── Downloads
│   ├── a-A-Google-Drive-20201122T041131Z-001
│   ├── a-A-Google-Drive-20201122T041131Z-007
│   └── dotfiles-master
├── Favorites
│   └── Links
├── IntelGraphicsProfiles
├── Links
├── Local Settings -> /mnt/c/Users/bryan/AppData/Local
├── Music
├── My Documents -> /mnt/c/Users/bryan/Documents
├── NetHood -> /mnt/c/Users/bryan/AppData/Roaming/Microsoft/Windows/Network Shortcuts
├── OneDrive
│   ├── APPACADEMY-CLEAN
│   ├── App-Academy-Notes
│   ├── App-Academy-master-alycia
│   ├── Desktop
│   ├── Documents
│   ├── Google Drive
│   ├── My Notebook @ PennO365
│   ├── OneNote Uploads
│   ├── Pictures
│   ├── a-A-September
│   └── javascript.info
├── PrintHood -> /mnt/c/Users/bryan/AppData/Roaming/Microsoft/Windows/Printer Shortcuts
├── Recent -> /mnt/c/Users/bryan/AppData/Roaming/Microsoft/Windows/Recent
├── Roaming
│   └── Intel
├── Saved Games
├── Searches
├── SendTo -> /mnt/c/Users/bryan/AppData/Roaming/Microsoft/Windows/SendTo
├── Start Menu -> /mnt/c/Users/bryan/AppData/Roaming/Microsoft/Windows/Start Menu
├── Templates -> /mnt/c/Users/bryan/AppData/Roaming/Microsoft/Windows/Templates
├── Videos
│   └── Captures
└── vimfiles
    ├── colors
    ├── compiler
    ├── doc
    ├── ftdetect
    ├── ftplugin
    ├── indent
    ├── keymap
    ├── plugin
    └── syntax

56 directories




------

<==_______________________________________ (bryan@LAPTOP-9LGJ3JGS:/mnt/c/Users/bryan/OneDrive$ tree -L 2 -d -R) ______________________________________==>

------

bryan@LAPTOP-9LGJ3JGS:/mnt/c/Users/bryan$ cd OneDrive/

.
├── APPACADEMY-CLEAN
│   ├── My Web Sites
│   └── Repositories
├── App-Academy-Notes
│   ├── week-1
│   ├── week-10
│   ├── week-2
│   ├── week-3
│   ├── week-4
│   ├── week-5
│   ├── week-6
│   ├── week-7
│   ├── week-8
│   └── week-9
├── App-Academy-master-alycia
│   ├── 7.13-7.17
│   ├── 7.20-7.24
│   ├── 7.27-7.31
│   ├── 8.10-8.14
│   ├── 8.17-8.21
│   ├── 9.14-9.18
│   ├── 9.8-9.11
│   ├── week4
│   ├── week7
│   └── week8
├── Desktop
│   └── OneNote Notebooks
├── Documents
│   ├── a-A-October
│   ├── applications
│   └── old-Documents
├── Google Drive
│   ├── App Academy August Cohort 2020
│   ├── Brain trust
│   ├── Google Drive
│   ├── Personal _ Financial
│   └── job search
├── My Notebook @ PennO365
│   └── OneNote_RecycleBin
├── OneNote Uploads
├── Pictures
│   ├── (1) Bryan Guner _ Facebook_files
│   ├── 2020-07
│   ├── 2020-08
│   ├── Camera Roll
│   ├── Camera imports
│   ├── Saved Pictures
│   └── Screenshots
├── a-A-September
│   ├── 00-weeks
│   └── 01-EVERYTHING-ELSE
└── javascript.info
    ├── article
    ├── ebook
    ├── frontpage
    ├── img
    ├── needed to render
    ├── pack
    ├── pay-methods
    ├── profile
    ├── task
    ├── team
    └── tutorial

63 directories




------

<==_______________________________________ (bryan@LAPTOP-9LGJ3JGS:/mnt$ tree -L 2 -d -R) ______________________________________==>

------







------

<==____________ (
bryan@LAPTOP-9LGJ3JGS:/mnt/c/Users/bryan$ tree -L 2 -d -R) ____==>

------

.
├── APPACADEMY-CLEAN
│   ├── My Web Sites
│   └── Repositories
├── App-Academy-Notes
│   ├── week-1
│   ├── week-10
│   ├── week-2
│   ├── week-3
│   ├── week-4
│   ├── week-5
│   ├── week-6
│   ├── week-7
│   ├── week-8
│   └── week-9
├── App-Academy-master-alycia
│   ├── 7.13-7.17
│   ├── 7.20-7.24
│   ├── 7.27-7.31
│   ├── 8.10-8.14
│   ├── 8.17-8.21
│   ├── 9.14-9.18
│   ├── 9.8-9.11
│   ├── week4
│   ├── week7
│   └── week8
├── Desktop
│   └── OneNote Notebooks
├── Documents
│   ├── a-A-October
│   ├── applications
│   └── old-Documents
├── Google Drive
│   ├── App Academy August Cohort 2020
│   ├── Brain trust
│   ├── Google Drive
│   ├── Personal _ Financial
│   └── job search
├── My Notebook @ PennO365
│   └── OneNote_RecycleBin
├── OneNote Uploads
├── Pictures
│   ├── (1) Bryan Guner _ Facebook_files
│   ├── 2020-07
│   ├── 2020-08
│   ├── Camera Roll
│   ├── Camera imports
│   ├── Saved Pictures
│   └── Screenshots
├── a-A-September
│   ├── 00-weeks
│   └── 01-EVERYTHING-ELSE
└── javascript.info
    ├── article
    ├── ebook
    ├── frontpage
    ├── img
    ├── needed to render
    ├── pack
    ├── pay-methods
    ├── profile
    ├── task
    ├── team
    └── tutorial

63 directories







------

<==_______________________________________ (bryan@LAPTOP-9LGJ3JGS:/$ tree -L 3 -d) ______________________________________==>

------










.
├── bin -> usr/bin
├── boot
├── dev
│   ├── block
│   ├── fd -> /proc/self/fd
│   ├── pts
│   └── shm -> /run/shm
├── etc
│   ├── NetworkManager
│   │   └── dispatcher.d
│   ├── PackageKit
│   ├── X11
│   │   ├── Xreset.d
│   │   ├── Xresources
│   │   ├── Xsession.d
│   │   ├── app-defaults
│   │   └── xkb
│   ├── alternatives
│   ├── apache2
│   │   └── conf-available
│   ├── apparmor
│   │   └── init
│   ├── apparmor.d
│   │   ├── abstractions
│   │   ├── disable
│   │   ├── force-complain
│   │   ├── local
│   │   └── tunables
│   ├── apport
│   │   └── blacklist.d
│   ├── apt
│   │   ├── apt.conf.d
│   │   ├── auth.conf.d
│   │   ├── preferences.d
│   │   ├── sources.list.d
│   │   └── trusted.gpg.d
│   ├── bash_completion.d
│   ├── binfmt.d
│   ├── byobu
│   ├── ca-certificates
│   │   └── update.d
│   ├── calendar
│   ├── cloud
│   │   ├── cloud.cfg.d
│   │   └── templates
│   ├── console-setup
│   ├── cron.d
│   ├── cron.daily
│   ├── cron.hourly
│   ├── cron.monthly
│   ├── cron.weekly
│   ├── cryptsetup-initramfs
│   ├── dbus-1
│   │   ├── session.d
│   │   └── system.d
│   ├── dconf
│   │   └── db
│   ├── default
│   │   └── grub.d
│   ├── depmod.d
│   ├── dhcp
│   │   ├── dhclient-enter-hooks.d
│   │   └── dhclient-exit-hooks.d
│   ├── dpkg
│   │   ├── dpkg.cfg.d
│   │   └── origins
│   ├── fonts
│   │   ├── conf.avail
│   │   └── conf.d
│   ├── fwupd
│   │   └── remotes.d
│   ├── groff
│   ├── gss
│   │   └── mech.d
│   ├── init.d
│   ├── initramfs-tools
│   │   ├── conf.d
│   │   ├── hooks
│   │   └── scripts
│   ├── iproute2
│   │   ├── rt_protos.d
│   │   └── rt_tables.d
│   ├── iscsi
│   ├── kernel
│   │   ├── install.d
│   │   ├── postinst.d
│   │   └── postrm.d
│   ├── landscape
│   ├── ld.so.conf.d
│   ├── ldap
│   ├── lighttpd
│   │   ├── conf-available
│   │   └── conf-enabled
│   ├── logcheck
│   │   ├── ignore.d.server
│   │   └── violations.d
│   ├── logrotate.d
│   ├── lvm
│   │   └── profile
│   ├── mdadm
│   ├── modprobe.d
│   ├── modules-load.d
│   ├── netplan
│   ├── network
│   │   ├── if-pre-up.d
│   │   └── if-up.d
│   ├── networkd-dispatcher
│   │   ├── carrier.d
│   │   ├── degraded.d
│   │   ├── dormant.d
│   │   ├── no-carrier.d
│   │   ├── off.d
│   │   └── routable.d
│   ├── newt
│   ├── opt
│   ├── pam.d
│   ├── perl
│   │   └── Net
│   ├── pki
│   │   ├── fwupd
│   │   └── fwupd-metadata
│   ├── pm
│   │   └── sleep.d
│   ├── polkit-1
│   │   ├── localauthority
│   │   └── localauthority.conf.d
│   ├── pollinate
│   ├── profile.d
│   ├── pulse
│   │   └── client.conf.d
│   ├── python2.7
│   ├── python3
│   ├── python3.8
│   ├── rc0.d
│   ├── rc1.d
│   ├── rc2.d
│   ├── rc3.d
│   ├── rc4.d
│   ├── rc5.d
│   ├── rc6.d
│   ├── rcS.d
│   ├── rsyslog.d
│   ├── security
│   │   ├── limits.d
│   │   └── namespace.d
│   ├── selinux
│   ├── sensors.d
│   ├── skel
│   ├── sos
│   │   ├── cleaner
│   │   ├── extras.d
│   │   ├── groups.d
│   │   └── presets.d
│   ├── ssh
│   │   ├── ssh_config.d
│   │   └── sshd_config.d
│   ├── ssl
│   │   ├── certs
│   │   └── private
│   ├── sudoers.d
│   ├── sysctl.d
│   ├── systemd
│   │   ├── network
│   │   ├── system
│   │   └── user
│   ├── terminfo
│   ├── tmpfiles.d
│   ├── ubuntu-advantage
│   ├── udev
│   │   ├── hwdb.d
│   │   └── rules.d
│   ├── ufw
│   │   └── applications.d
│   ├── update-manager
│   │   └── release-upgrades.d
│   ├── update-motd.d
│   ├── update-notifier
│   ├── vim
│   ├── vmware-tools
│   │   ├── scripts
│   │   └── vgauth
│   ├── vulkan
│   │   ├── explicit_layer.d
│   │   ├── icd.d
│   │   └── implicit_layer.d
│   └── xdg
│       ├── autostart
│       └── systemd
├── home
│   └── bryan
├── lib -> usr/lib
├── lib32 -> usr/lib32
├── lib64 -> usr/lib64
├── libx32 -> usr/libx32
├── media
├── mnt
│   └── c
│       ├── $Recycle.Bin
│       ├── $SysReset
│       ├── Documents and Settings -> /mnt/c/Users
│       ├── FreeOCR
│       ├── Intel
│       ├── OneDriveTemp
│       ├── PerfLogs
│       ├── Program Files
│       ├── Program Files (x86)
│       ├── ProgramData
│       ├── Recovery
│       ├── System Volume Information
│       ├── Users
│       └── Windows
├── opt
├── proc
│   ├── 1
│   │   ├── attr
│   │   ├── cwd -> /
│   │   ├── fd
│   │   ├── net
│   │   ├── ns
│   │   ├── root -> /
│   │   └── task
│   ├── 1362
│   │   ├── attr
│   │   ├── cwd -> /
│   │   ├── fd
│   │   ├── net
│   │   ├── ns
│   │   ├── root -> /
│   │   └── task
│   ├── 1363
│   │   ├── attr
│   │   ├── cwd -> /
│   │   ├── fd
│   │   ├── net
│   │   ├── ns
│   │   ├── root -> /
│   │   └── task
│   ├── 1590
│   │   ├── attr
│   │   ├── cwd -> /
│   │   ├── fd
│   │   ├── net
│   │   ├── ns
│   │   ├── root -> /
│   │   └── task
│   ├── bus
│   ├── net -> self/net
│   ├── self -> 1590
│   ├── sys
│   │   ├── fs
│   │   ├── kernel
│   │   ├── net
│   │   └── vm
│   └── tty
├── root [error opening dir]
├── run
│   ├── lock
│   ├── mount
│   ├── resolvconf
│   ├── shm
│   ├── sudo [error opening dir]
│   └── user
├── sbin -> usr/sbin
├── snap
├── srv
├── sys
│   ├── block
│   ├── bus
│   ├── class
│   │   ├── backlight
│   │   ├── net
│   │   ├── power_supply
│   │   ├── switch
│   │   └── timed_output
│   ├── dev
│   ├── devices
│   │   ├── system
│   │   └── virtual
│   ├── firmware
│   ├── fs
│   │   └── cgroup
│   ├── kernel
│   │   ├── debug
│   │   ├── ipv4
│   │   └── mm
│   ├── module
│   │   └── lowmemorykiller
│   └── power
├── tmp
│   ├── apt-dpkg-install-j6iPdt [error opening dir]
│   └── vscode-typescript1000
├── usr
│   ├── bin
│   │   └── X11 -> .
│   ├── games
│   ├── include
│   │   ├── X11
│   │   ├── arpa
│   │   ├── asm-generic
│   │   ├── c++
│   │   ├── drm
│   │   ├── finclude
│   │   ├── iproute2
│   │   ├── libdmmp
│   │   ├── linux
│   │   ├── misc
│   │   ├── mtd
│   │   ├── net
│   │   ├── netash
│   │   ├── netatalk
│   │   ├── netax25
│   │   ├── neteconet
│   │   ├── netinet
│   │   ├── netipx
│   │   ├── netiucv
│   │   ├── netpacket
│   │   ├── netrom
│   │   ├── netrose
│   │   ├── nfs
│   │   ├── nodejs
│   │   ├── openssl
│   │   ├── protocols
│   │   ├── python3.8
│   │   ├── rdma
│   │   ├── rpc
│   │   ├── rpcsvc
│   │   ├── scsi
│   │   ├── sound
│   │   ├── uv
│   │   ├── v8 -> nodejs/deps/v8/include
│   │   ├── video
│   │   ├── x86_64-linux-gnu
│   │   ├── xen
│   │   └── xfs
│   ├── lib
│   │   ├── X11
│   │   ├── accountsservice
│   │   ├── apparmor
│   │   ├── apt
│   │   ├── bfd-plugins
│   │   ├── binfmt.d
│   │   ├── bolt
│   │   ├── byobu
│   │   ├── cloud-init
│   │   ├── compat-ld
│   │   ├── console-setup
│   │   ├── cryptsetup
│   │   ├── dbus-1.0
│   │   ├── dpkg
│   │   ├── dracut
│   │   ├── eject
│   │   ├── environment.d
│   │   ├── file
│   │   ├── finalrd
│   │   ├── gcc
│   │   ├── girepository-1.0
│   │   ├── git-core
│   │   ├── gnupg
│   │   ├── gnupg2
│   │   ├── gold-ld
│   │   ├── groff
│   │   ├── hdparm
│   │   ├── init
│   │   ├── initcpio
│   │   ├── initramfs-tools
│   │   ├── kernel
│   │   ├── klibc
│   │   ├── language-selector
│   │   ├── locale
│   │   ├── lsb
│   │   ├── man-db
│   │   ├── mime
│   │   ├── modprobe.d
│   │   ├── modules
│   │   ├── modules-load.d
│   │   ├── multipath
│   │   ├── nagios
│   │   ├── netplan
│   │   ├── networkd-dispatcher
│   │   ├── nodejs
│   │   ├── open-iscsi
│   │   ├── open-vm-tools
│   │   ├── openssh
│   │   ├── packagekit
│   │   ├── pkgconfig
│   │   ├── pm-utils
│   │   ├── policykit-1
│   │   ├── python2.7
│   │   ├── python3
│   │   ├── python3.8
│   │   ├── python3.9
│   │   ├── recovery-mode
│   │   ├── rsyslog
│   │   ├── sasl2
│   │   ├── snapd
│   │   ├── software-properties
│   │   ├── ssl
│   │   ├── sudo
│   │   ├── sysctl.d
│   │   ├── systemd
│   │   ├── sysusers.d
│   │   ├── tc
│   │   ├── terminfo
│   │   ├── tmpfiles.d
│   │   ├── ubuntu-release-upgrader
│   │   ├── udev
│   │   ├── ufw
│   │   ├── update-notifier
│   │   ├── valgrind
│   │   ├── x86_64-linux-gnu
│   │   └── xfsprogs
│   ├── lib32
│   ├── lib64
│   ├── libexec
│   │   └── fwupd
│   ├── libx32
│   ├── local
│   │   ├── bin
│   │   ├── etc
│   │   ├── games
│   │   ├── include
│   │   ├── lib
│   │   ├── man -> share/man
│   │   ├── sbin
│   │   ├── share
│   │   └── src
│   ├── sbin
│   ├── share
│   │   ├── GConf
│   │   ├── PackageKit
│   │   ├── X11
│   │   ├── aclocal
│   │   ├── adduser
│   │   ├── alsa
│   │   ├── applications
│   │   ├── apport
│   │   ├── apps
│   │   ├── awk
│   │   ├── base-files
│   │   ├── base-passwd
│   │   ├── bash-completion
│   │   ├── binfmts
│   │   ├── bug
│   │   ├── build-essential
│   │   ├── byobu
│   │   ├── ca-certificates
│   │   ├── calendar
│   │   ├── cmake
│   │   ├── common-licenses
│   │   ├── console-setup
│   │   ├── consolefonts
│   │   ├── consoletrans
│   │   ├── cryptsetup
│   │   ├── dbus-1
│   │   ├── debconf
│   │   ├── debhelper
│   │   ├── debianutils
│   │   ├── dict
│   │   ├── distro-info
│   │   ├── doc
│   │   ├── doc-base
│   │   ├── dpkg
│   │   ├── drirc.d
│   │   ├── file
│   │   ├── finalrd
│   │   ├── fish
│   │   ├── fonts
│   │   ├── fwupd
│   │   ├── gcc-10
│   │   ├── gdb
│   │   ├── gettext
│   │   ├── git-core
│   │   ├── gitweb
│   │   ├── glib-2.0
│   │   ├── gnupg
│   │   ├── groff
│   │   ├── hal
│   │   ├── i18n
│   │   ├── icons
│   │   ├── info
│   │   ├── initramfs-tools
│   │   ├── iptables
│   │   ├── iso-codes
│   │   ├── java
│   │   ├── javascript
│   │   ├── keyrings
│   │   ├── landscape
│   │   ├── language-selector
│   │   ├── language-support
│   │   ├── language-tools
│   │   ├── libc-bin
│   │   ├── libdrm
│   │   ├── licenses
│   │   ├── lintian
│   │   ├── locale
│   │   ├── locales
│   │   ├── man
│   │   ├── man-db
│   │   ├── mdadm
│   │   ├── menu
│   │   ├── metainfo
│   │   ├── mime
│   │   ├── misc
│   │   ├── nano
│   │   ├── netplan
│   │   ├── node-mime
│   │   ├── nodejs
│   │   ├── npm
│   │   ├── open-vm-tools
│   │   ├── openssh
│   │   ├── package-data-downloads
│   │   ├── pam
│   │   ├── pam-configs
│   │   ├── pastebin.d
│   │   ├── perl
│   │   ├── perl-openssl-defaults
│   │   ├── perl5
│   │   ├── pixmaps
│   │   ├── pkgconfig
│   │   ├── plymouth
│   │   ├── polkit-1
│   │   ├── popularity-contest
│   │   ├── publicsuffix
│   │   ├── pyshared
│   │   ├── python
│   │   ├── python-apt
│   │   ├── python-wheels
│   │   ├── python3
│   │   ├── readline
│   │   ├── rsync
│   │   ├── rsyslog
│   │   ├── screen
│   │   ├── secureboot
│   │   ├── sensible-utils
│   │   ├── sounds
│   │   ├── systemd
│   │   ├── tabset
│   │   ├── terminfo
│   │   ├── ubuntu-release-upgrader
│   │   ├── ufw
│   │   ├── unattended-upgrades
│   │   ├── update-notifier
│   │   ├── vim
│   │   ├── vulkan
│   │   ├── wsl
│   │   ├── wslu
│   │   ├── xml
│   │   ├── zoneinfo
│   │   ├── zoneinfo-icu
│   │   └── zsh
│   └── src
└── var
    ├── backups
    ├── cache
    │   ├── PackageKit
    │   ├── app-info
    │   ├── apparmor
    │   ├── apt
    │   ├── debconf
    │   ├── ldconfig
    │   ├── man
    │   ├── pollinate
    │   ├── private
    │   └── snapd
    ├── crash
    ├── lib
    │   ├── AccountsService
    │   ├── PackageKit
    │   ├── apt
    │   ├── boltd
    │   ├── command-not-found
    │   ├── dbus
    │   ├── dhcp
    │   ├── dpkg
    │   ├── fwupd
    │   ├── git
    │   ├── initramfs-tools
    │   ├── landscape
    │   ├── logrotate
    │   ├── man-db
    │   ├── misc
    │   ├── pam
    │   ├── plymouth
    │   ├── polkit-1
    │   ├── private
    │   ├── python
    │   ├── snapd
    │   ├── sudo
    │   ├── systemd
    │   ├── tpm
    │   ├── ubuntu-advantage
    │   ├── ubuntu-release-upgrader
    │   ├── ucf
    │   ├── unattended-upgrades
    │   ├── update-manager
    │   ├── update-notifier
    │   ├── usbutils
    │   └── vim
    ├── local
    ├── lock -> /run/lock
    ├── log
    │   ├── apt
    │   ├── dist-upgrade
    │   ├── journal
    │   ├── landscape
    │   ├── private
    │   └── unattended-upgrades
    ├── mail
    ├── opt
    ├── run -> /run
    ├── snap
    ├── spool
    │   ├── cron
    │   ├── mail -> ../mail
    │   └── rsyslog
    └── tmp

616 directories
