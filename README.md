# Extension for Treasure Data's TD-JS-SDK

## Installation

1. Embed TD-JS-SDK loader in your html file. This is the same process as official TD-JS-SDK implementation.

```html
<!-- Treasure Data -->
<script type="text/javascript">
!function(t,e){if(void 0===e[t]){e[t]=function(){e[t].clients.push(this),this._init=[Array.prototype.slice.call(arguments)]},e[t].clients=[];for(var r=function(t){return function(){return this["_"+t]=this["_"+t]||[],this["_"+t].push(Array.prototype.slice.call(arguments)),this}},s=["blockEvents","unblockEvents","setSignedMode","setAnonymousMode","resetUUID","addRecord","fetchGlobalID","set","trackEvent","trackPageview","trackClicks","ready"],n=0;n<s.length;n++){var c=s[n];e[t].prototype[c]=r(c)}var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=("https:"===document.location.protocol?"https:":"http:")+"//cdn.treasuredata.com/sdk/2.1/td.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)}}("Treasure",this);</script>
```

2. Embed two files in `/dist` directory. One is a core file of this extension, another one is configuration and initialization file.

```html
<script src="../dist/td-js-sdk-ext.js"></script>
<script src="../dist/config.js"></script>
```

3. Modify `config.js` by following the below Configuration section.


## Configuration

