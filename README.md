# Sonic Trace


Sonic Trace is KCRW's story-telling project that begins in the heart of Los Angeles and crosses into Mexico and Central America.


## Setup

```bash
npm install
```

```bash
git submodule update --init --recursive
```

## Build Commands

```bash
bbb watch
```

```bash
bbb debug
```

```bash
bbb release
```




## Production Install

Tested on Linux version 2.6.18-028stab101.1 with Apache/2.2.22. Be sure mod_rewrite module is installed. htaccess file may need to be modified if app is not run from root directory.

### Using ssh and git

Clone repository into web directory and checkout stable branch.

```bash
cd /path/to/web
git clone git@github.com:Zeega/Sonic-Trace.git .
git checkout stable
```

Copy htaccess and index dist files.

```bash
cp .htaccess.dist .htaccess
cp index.html.dist index.html
```
### Using ftp

Download and unzip stable branch from [here](https://github.com/Zeega/Sonic-Trace/archive/stable.zip).

Rename .htaccess.dist and index.html.dist to .htaccess and index.html, repestively.

Upload folder contents to web directory.



## Content:

- Update intro Vimeo video id in [app/templates/intro.html](app/templates/intro.html)
- Update Zeega collection id in [app/modules/marker.js](app/modules/marker.js)
- For a list of supported origins see [app/modules/origins.js](app/modules/origins.js)
- Supported icon types
    * burbuja : use tag icon-burbuja
    * audio : use tag icon-audio
    * video : use tag icon-video
    * standard : default, leave untagged 


## Notes

Vendor deps:

- Bootstrap http://twitter.github.com/bootstrap
- LeafLet http://leafletjs.com/reference.html
- Stamen http://maps.stamen.com
