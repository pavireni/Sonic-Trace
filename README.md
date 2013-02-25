# Sonic Trace


Sonic Trace is a new story-telling project that begins in the heart of Los Angeles and crosses into Mexico, El Salvador, Guatemala and Honduras produced in partnership with KCRW, AIR and Zeega. 

## Production Install

Tested on Linux version 2.6.18-028stab101.1 with Apache/2.2.22. Be sure mod_rewrite module is installed. htaccess file may need to be modified if app is not run from root directory.

### Using ssh and git

Clone repository into web directory and checkout stable branch.

```bash
cd /path/to/web
git clone https://github.com/Zeega/Sonic-Trace.git .
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



## Content

- Update the intro video by changing the file of this Vimeo video: http://vimeo.com/59031997. Or to change to another Vimeo video, change the ID in [app/templates/intro.html](app/templates/intro.html)
- Update Zeega collection id in [index.html](index.html.dist)
- The geodata for the origin map in the lower left is determined by tags associated with each Zeega story. 
  The list of supported origin tags is in [app/modules/origins.js](app/modules/origins.js). 
  Note that updating this file requires recompiling the release code.
- Supported icon types
    * burbuja : use tag icon-burbuja
    * audio : use tag icon-audio
    * video : use tag icon-video
    * standard : default, leave untagged 

### Map Content Management

Stories and the Zeega about the Burbuja's current location are created using Zeega's web-based applications for authoring multimedia stories and organizing collections. To create stories and the Zeega about the Burbuja's current location, login at http://zeega.com and then "Create a New Zeega." After composing the story, click "Publish." 

To curate which stories appear on the main map, access http://zeega.com/library. 

- From the "Items" dropdown select "Zeegas"
- Your published Zeegas will then be visible as thumbnails
- Click on the Zeega thumbnail to edit the story's metadata
- The text displayed when hovering on an icon on the map is the title associated with the Zeega. Click the pencil icon next to the title to make changes. Make sure to click "Save Changes" in the bottom right after finishing editing.
- In the lower-left, assign the relevant tags for the icon and origin. Make sure to always hit "Enter" after tags.
- Search the map to find the approximate location. Drag the pin to precisely locate the story
- After locating the story, click the √ icon in the upper-left of the map below the +/- zoom controls 
- To have the story display on the main map, drag it to the "Map Collection" on the left

<i>Notes</i>

- There is a noticeable 5 minute time lag between geolocating an item and the geodata appearing on the item. This is a result of syncing databases. Do not be alarmed if the mapped location is not visible until after the 5 minutes and the sync is complete! 
- It is not possible to edit the metadata of an item if you have clicked to open it from the map collection. To edit metadata, you must click the item from the main library workspace.


## Developers

### Setup

```bash
npm install
```

```bash
git submodule update --init --recursive
```

### Build Commands

```bash
bbb watch
```

```bash
bbb debug
```

```bash
bbb release
```




### Notes

Vendor deps:

- Bootstrap http://twitter.github.com/bootstrap
- LeafLet http://leafletjs.com/reference.html
- Stamen http://maps.stamen.com
