### Sonic Trace

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

- clone repository into web root directory

```bash
cd /path/to/webroot
git clone git@github.com:Zeega/Sonic-Trace.git .
```

- rename htaccess and index dist files

```bash
mv .htaccess.dist .htaccess
mv index.html.dist index.html
```


## Notes

Content:

- Update intro vimeo video id in [a link](app/templates/intro.html)
- Update Zeega collection id in app/modules/marker.js
- Supported icon types
-- burbuja : use tag icon-burbuja
> audio : use tag icon-audio
> video : use tag icon-video
> standard : default, leave untagged 
- For a list of supported origins see app/templates

Vendor deps:

- Bootstrap http://twitter.github.com/bootstrap
- LeafLet http://leafletjs.com/reference.html
- Stamen http://maps.stamen.com
