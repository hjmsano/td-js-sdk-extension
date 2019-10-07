# Extension for Treasure Data's TD-JS-SDK

## Installation

First of all, see `/example/index.html`. It helps you to understand the installation.

1. Embed TD-JS-SDK loader in your html file. This is the same process as official TD-JS-SDK implementation.

```html
<!-- Treasure Data -->
<script type="text/javascript">
!function(t,e){if(void 0===e[t]){e[t]=function(){e[t].clients.push(this),this._init=[Array.prototype.slice.call(arguments)]},e[t].clients=[];for(var r=function(t){return function(){return this["_"+t]=this["_"+t]||[],this["_"+t].push(Array.prototype.slice.call(arguments)),this}},s=["blockEvents","unblockEvents","setSignedMode","setAnonymousMode","resetUUID","addRecord","fetchGlobalID","set","trackEvent","trackPageview","trackClicks","ready"],n=0;n<s.length;n++){var c=s[n];e[t].prototype[c]=r(c)}var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=("https:"===document.location.protocol?"https:":"http:")+"//cdn.treasuredata.com/sdk/2.1/td.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)}}("Treasure",this);</script>
```

2. Embed two files in `/dist` directory. One is a core file of this extension, another one is configuration and initialization file.

```html
<script src="td-js-sdk-ext.js"></script>
<script src="config.js"></script>
```

3. Modify `config.js` by following the below Configuration section.


## Configuration



## Action and Category combination

|Action|Category|Description|
|:----|:----|:----|
|`view`|`page`|Pageview Event. One record per a pageview.|
|`rum`|`page`|A record for logging the performance information for Real User Monitoring. One record per a pageview.|
|`scroll`|`page`|A record with scroll depth data. Multiple records per a pageview.|
|`unload`|`page`|When the page is unloaded, this event will be transmitted. But Safari on iOS is not sending due to its limitation.|
|`read`|`content`|Records for Read-Through rate measurement. Multiple records per a pageview.|
|`click`|`link`|Click Tracking for `A` tags.|
|`click`|`button`|Click Tracking for other than `A` tags.|
|`play`|`video`|When user start playing a video, this record will be created.|
|`pause`|`video`||
|`timeupdate`|`video`|Heartbeat data for media tracking.|
|`ended`|`video`||
|`play`|`audio`||
|`pause`|`audio`||
|`timeupdate`|`audio`||
|`ended`|`audio`||
|`answer`|`survey`|If you are using [TD-Survey](https://github.com/hjmsano/td-survey), the survey result will be recorded with these action/category pair.|


## License and Copyright
This extension is forked from [Ingestly Tracking JavaScript](https://github.com/ingestly/ingestly-client-javascripthttps://github.com/ingestly/ingestly-client-javascript).
