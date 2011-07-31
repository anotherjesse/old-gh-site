---
title: Configuring Lion
description: Setting up a new laptop
layout: post
category: osx
---

So you got a new laptop.  Time to make it sing.

# Install:

 - Xcode via App Store
 - [Dropbox](http://www.dropbox.com/)
 - [1password](http://agilebits.com/products/1Password/Mac)
 - [zooom](http://coderage-software.com/zooom/)
 - [sizeup](http://irradiatedsoftware.com/downloads/)
 - [iterm2](http://www.iterm2.com/)
 - [chrome dev](http://www.google.com/chrome/intl/en/eula_dev.html)
 - Skype
 - [Flux](http://stereopsis.com/flux/)
 
# Notational Velocity

A very useful wiki that syncs with android, iPhone, ...

 - downlooad [nvALT](http://brettterpstra.com/project/nvalt/)
 - install [safari/chrome extensions](http://elasticthreads.tumblr.com/post/8212672178/nvit-chrome-and-safari-extensions-for-nvalt)

Configuration:

 - save as text
 - store notes in ~/notes 
 - sync with simplenotes

# Development
 
After installing Xcode we can move on to [brew](https://github.com/mxcl/homebrew/wiki/installation)

    /usr/bin/ruby -e "$(curl -fsSL https://raw.github.com/gist/323731)"
    
Then install some basics:

    brew install git
    brew install macvim
    brew install ack
    brew install bazaar
    brew install fping
    brew install ipmitool
    brew install readline
    brew install watch
    brew install wget
    brew install unrar
    brew install graphviz

Also Ruby Gems needs updated:

    sudo gem update --system

## Vim

Upload your id_rsa.pub for this laptop to github then finish configuring:

    mkdir ~/oss
    
    # clone/init dotfiles
    git clone git@github.com:anotherjesse/dotfiles ~/oss/dotfiles
    cd ~/oss/dotfiles
    git submodule init
    git submodule update
    git submodule foreach git submodule init
    git submodule foreach git submodule update
    
    # finish setting up macvim
    ln -s ~/oss/dotfiles/vim ~/.vim
    ln -s ~/oss/dotfiles/vimrc ~/.vimrc
    
## iterm2

 - unlimited scroll back
 - update font choice
 - 256 color xterm

# Email

I configured my system to be able to quickly delete and archive mail in gmail from Mail.  This is done with a combination of mail.app settings, gmail settings, and a plugin called Mail Act-On.

First in Gmail settings, make enable *Show in IMAP* for:

- Drafts
- Sent
- Spam
- Trash

Then in Mail.app, expose the Mailbox pane then:

- Select [Gmail] / Drafts, then Mailbox -> Use Mailbox for "Drafts"
- Select [Gmail] / Spam, then Mailbox -> Use Mailbox for "Junk"
- Select [Gmail] / Sent, then Mailbox -> Use Mailbox for "Sent"
- Select [Gmail] / Trash, then Mailbox -> Use Mailbox for "Trash"

## Configure [Mail Act-On](http://www.indev.ca/MailActOn.html)

Optimize the Mail.app by going to the *Message Viewing* section of the Mail Act-On tab in preferences then:

- Select: Do not mark messages as read
- Enable: Spacebar immediately marks message as read
- Enable: Spacebar advances to next unread message
- Enable: Escape key unselects messages

Now we need to create rules to easily archive messages.  For each account we need to create an entry in Rules -> Act-On Rules:

- Description: Archive (account name)
- Hotkey: **Y**
- Condition: Account is (account)
- Action: *Move Message* to mailbox *Archive folder for account*  ([Gmail] / *All Mail* or a custom folder for Exchange accounts)

Then as you read mail you can press Ctrl-Y to archive or Delete to delete.  This works for messages in the combined inbox view as well.

# System Settings

 - Desktop & Screen saver -> Screensaver -> Hot Corners
   - upper-left disable screensaver
   - lower right start screensaver
 - Mission Control
   - Disable *Show Dashboard as a space*
   - Disable *Automatically rearrange spaces based on recent use*
 - Security & Privacy
   - General: change password to **5 seconds** after sleep/screen saver
 - Universal Access
   - Enable access for assistive devices (needed for zoom)
 - Displays
   - Check: Show displays in menu bar
 - Keyboard -> Keyboard Shortcuts
   - Select *All Controls* for Full Keyboard Access
 - Trackpad
   - speed up tracking speed
 - Sharing
   - set computer name
   - enabled *Remote login* aka SSH
 - Download [Inconsolata-dz](http://media.nodnod.net/Inconsolata-dz.otf.zip) and configure iterm2, Skype and others to use it.

## Fix finder preferences:

 - Finder -> Finder Preferences
   - Enable *Show all filename extensions*
   - When performing a search: *Search the current folder*

## Fix some horrible defaults via terminal:

    # show hidden files in finder
    defaults write com.apple.finder AppleShowAll­Files –bool YES
    # show full paths in finder
    defaults write com.apple.finder _FXShowPosixPathInTitle –bool YES
    # disable animation
    defaults write NSGlobal­DomainNSAutomaticWindowAnimationsEnabled –bool NO
    # don't show optional characters 
    defaults write -g ApplePressAndHoldEnabled -bool false
    # don't reload old files
    defaults write com.apple.Preview NSQuitAlwaysKeepsWindows -bool false
    defaults write com.apple.QuickTimePlayerX NSQuitAlwaysKeepsWindows -bool false
