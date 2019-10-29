# Extension for Treasure Data's TD-JS-SDK

[English document available here / 英語のドキュメントはこちら](README.md)

## 導入

まず先に、 `/example/index.html` を見てください。導入方法について理解するのに役立ちます。

1. TD-JS-SDKローダーをhtmlに埋め込みます。これは [公式の TD-JS-SDK 実装](https://github.com/treasure-data/td-js-sdk#installing) と同じ手順です。
**この最初のステップ以外の手順は行わないでください。 `new Treasure()` や他のコードは必要ありません。全て `config.js` に内用されています。**

```html
<!-- Treasure Data -->
<script type="text/javascript">
!function(t,e){if(void 0===e[t]){e[t]=function(){e[t].clients.push(this),this._init=[Array.prototype.slice.call(arguments)]},e[t].clients=[];for(var r=function(t){return function(){return this["_"+t]=this["_"+t]||[],this["_"+t].push(Array.prototype.slice.call(arguments)),this}},s=["blockEvents","setSignedMode","fetchServerCookie","unblockEvents","setSignedMode","setAnonymousMode","resetUUID","addRecord","fetchGlobalID","set","trackEvent","trackPageview","trackClicks","ready"],n=0;n<s.length;n++){var o=s[n];e[t].prototype[o]=r(o)}var c=document.createElement("script");c.type="text/javascript",c.async=!0,c.src=("https:"===document.location.protocol?"https:":"http:")+"//cdn.treasuredata.com/sdk/2.2/td.min.js";var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(c,i)}}("Treasure",this);
</script>
```

2. `/dist` ディレクトリ内の2つのファイルを埋め込んでください。1つはこの拡張のコアファイル、もう一つは設定と初期化のファイルです。
  - `td-js-sdk-ext.js` はこの拡張のコアライブラリです
  - `config.js` は計測に必要な全てを内包しています

```html
<script src="td-js-sdk-ext.js"></script>
<script src="config.js"></script>
```

3. `config.js` を以下の「構成」セクションの手順に従って変更します。


## 構成

### TreasureData 標準の設定変数

`config.js` の冒頭に、 TD-JS-SDKを初期化するための `var td = new Treasure({...});` のような行があります。
これはTD-JS-SDKの標準的な設定プロセスなので、 [TD-JS-SDK Readme 中の公式リファレンス](https://github.com/treasure-data/td-js-sdk#treasureconfig) を参照しながら各変数をセットしてください。

### Extension 固有の設定変数

`new Treasure({...})` の数行後に、`tdext.init({...})` のようなもう一つの初期化メソッド呼び出しがあります。
何を計測するか、イベントの粒度をどうするかを制御可能です。

|変数|例|説明|
|:---|:---|:---|
|`table`|`weblog`|A table name for storing all data measured by the extension|
|`eventName`|`TDExtRecurringEvent`|The extension dispatches a recurring event to observe element visibility. Change an event name if needed.|
|`eventFrequency`|`250`|A throttling interval for the recurring event. This is linked to the data accuracy and the user experience.|
|`targetWindow`|`self`|A frame to be observed but basically this should be `self` because TD-JS-SDK does not work in iframe properly.|
|`tdNs`|`td`|A namespace of TD-JS-SDK object.|

#### ページ上での滞在時間（unload）

- Unload tracking set an eventListener to one of available events when the page is being unloaded.
- You can get an exact time that user spent during the specific pageview.
- In `tdext.init()`, set `true` for `options.unload.enable`.

#### data-trackable を用いたクリック計測

- Click tracking is triggered if the clicked element (or its parent) has the specified `data-*` attribution.
- In `tdext.init()`, set `true` for `options.clicks.enable` and adjust values:

|変数|例|説明|
|:---|:---|:---|
|`targetAttr`|`data-trackable`|attribution name for identifying the target element|

- If you set `data-trackable` for `targetAttr`, you need to add `data-trackable` attribution to every element you want to track clicks.
- Ideally, every block elements should be structured like hierarchy. and each block element should have `data-trackable` with meaningful value.

#### スクロール深度

- Scroll depth tracking for both fixed page and infinity scroll (lazy-load) page.
- In `tdext.init()`, set `true` for `options.scroll.enable` and adjust values:

|変数|例|説明|
|:---|:---|:---|
|`threshold`|`2`|track the depth when the user stay at/over X percent/pixels for more than T seconds specified here|
|`granularity`|`20`|track the depth every X percent/pixels increased|
|`unit`|`percent`|for the fixed height page, you can use `percent`. If the page is infinity scroll, use `pixels` instead|

#### 読了率

- Read-Through Rate means is a metrics that describes how much range of content is consumed by an user.
- In `tdext.init()`, set `true` for `options.read.enable` and adjust values:

|変数|例|説明|
|:---|:---|:---|
|`threshold`|`4`|track the depth of content when the user stay at/over X percent|
|`granularity`|`10`|track the rate every X percent increased|
|`targets`|`document.getElementById('article')`|An element which contains article body (content). Specify a block elements to be observed as a target of read-through.|

#### メディア計測

- Once you enabled this option, all media which is VIDEO or AUDIO will be tracked automatically.
- This option supports `play`, `pause` and `eneded` events plus the heart-beat.
- In `tdext.init()`, set `true` for `options.media.enable` and adjust values:

|変数|例|説明|
|:---|:---|:---|
|`heartbeat`|`5`|the heart-beat tracker will be dispatched every X sec defined here|

#### フォーム分席

- Form Analysis provides a statistics info regarding the form completion but not values of form fields.
- This feature accepts multiple forms by passing a list of target element of forms.
- In `tdext.init()`, set `true` for `options.form.enable` and adjust values:

|変数|例|説明|
|:---|:---|:---|
|`targets`|`document.getElementsByTagName('form')`|A list of form elements.|


## メソッド

### tdext.trackPageview()

- Track a pageview event
- No parameter

### tdext.trackAction(action, category, context)

- Track a custom event

|parameter|example|description|
|:---|:---|:---|
|`action`|`toggle`|An action name.|
|`category`|`switch`|A target being applied the action.|
|`context`|`{name: "hoge"}`|An object of custom context for the event.|

### tdext.trackRead(target)

- Initialize the Read-Through tracking
- If your page uses the lazy-load (infinity scroll and append another content ondemandly), you should re-initialize by `trackRead()` to measure the newly added article.

|parameter|example|description|
|:---|:---|:---|
|`target`|`document.getElementById('article')`|A block element which contains an article body (content).|


## Action と Category の組み合わせ

|Action|Category|説明|
|:----|:----|:----|
|`view`|`page`|Pageview Event. One record per a pageview.|
|`rum`|`page`|A record for logging the performance information for Real User Monitoring. One record per a pageview.|
|`scroll`|`page`|A record with scroll depth data. Multiple records per a pageview.|
|`unload`|`page`|When the page is unloaded, this event will be transmitted. But Safari on iOS is not sending due to its limitation.|
|`read`|`content`|Records for Read-Through rate measurement. Multiple records per a pageview.|
|`click`|`link`|Click Tracking for `A` tags.|
|`click`|`button`|Click Tracking for other than `A` tags.|
|`play`|`video` or `audio`|When user start playing a video, this record will be created.|
|`pause`|`video` or `audio`||
|`timeupdate`|`video` or `audio`|Heartbeat data for media tracking.|
|`ended`|`video` or `audio`||
|`stats`|`form`|A record for Form Analysis. The data is sent on `unload` event.|
|`answer`|`survey`|If you are using [TD-Survey](https://github.com/hjmsano/td-survey), the survey result will be recorded with these action/category pair.|


## 拡張によって計測されたデータに対するクエリー

### 日別ページビュー数とユニークブラウザ数

```sql
SELECT
  TD_TIME_FORMAT(time,
    'yyyy-MM-dd',
    'JST') AS date_time,
  COUNT(*) AS pageviews,
  COUNT(DISTINCT td_client_id) AS unique_browsers
FROM
  your_database.weblog  -- 変更してください
WHERE
  TD_TIME_RANGE(time,
    DATE_FORMAT(DATE_ADD('hour',
      9 - (24 * 30),  -- 日本時間で過去30日
      NOW()),
      '%Y-%m-%d %H:%i:%s'),
    NULL,
    'JST')
  AND action = 'view'
  AND category = 'page'
GROUP BY
  1
;
```

### トップページのスクロール深度

```sql
SELECT
  SUM(CASE
      WHEN (scroll_depth >= 20) THEN 1 ELSE 0 END) AS "20p",
  SUM(CASE
      WHEN (scroll_depth >= 40) THEN 1 ELSE 0 END) AS "40p",
  SUM(CASE
      WHEN (scroll_depth >= 60) THEN 1 ELSE 0 END) AS "60p",
  SUM(CASE
      WHEN (scroll_depth >= 80) THEN 1 ELSE 0 END) AS "80p",
  SUM(CASE
      WHEN (scroll_depth >= 100) THEN 1 ELSE 0 END) AS "100p"
FROM (
    SELECT
      root_id,
      MAX(scroll_depth) AS scroll_depth
    FROM
      your_database.weblog  -- 変更してください
    WHERE
      TD_TIME_RANGE(time,
        DATE_FORMAT(DATE_ADD('hour',
          9-24,  -- 日本時間で過去24時間
          NOW()),
          '%Y-%m-%d %H:%i:%s'),
        NULL,
        'JST')
      AND action = 'scroll'
      AND category = 'page'
      AND td_path = '/'
    GROUP BY
      root_id
  )
;
```

### 記事別読了率 （読了は 10秒以上かつ80%以上）

```sql
SELECT
  td_title,
  SUM(CASE WHEN action = 'view' THEN 1 ELSE 0 END) AS pageviews,
  SUM(CASE WHEN action = 'read' THEN 1 ELSE 0 END) AS read_complete
FROM (
    SELECT
      td_title,
      root_id,
      action,
      MAX(read_rate) AS read_depth
    FROM
      your_database.weblog -- 変更してください
    WHERE
      TD_TIME_RANGE(time,
        DATE_FORMAT(DATE_ADD('hour',
          9-24, -- 日本時間で過去24時間
          NOW()),
          '%Y-%m-%d %H:%i:%s'),
        NULL,
        'JST')
      AND(
        (
          action = 'read'
          AND category = 'content'
          AND read_elapsed_ms >= 10000
          AND read_rate >= 80
        )
        OR (
          action = 'view'
          AND category = 'page'
        )
      )
    GROUP BY
      td_title,
      root_id,
      action
  )
GROUP BY
  td_title
;
```

### メディアファイル別メディア (ビデオ & オーディオ) 再生分析

```sql
SELECT
  media_src AS media,
  CASE
    WHEN played_percent >= 100 THEN '100p'
    WHEN played_percent >= 80 THEN '80p'
    WHEN played_percent >= 60 THEN '60p'
    WHEN played_percent >= 40 THEN '40p'
    WHEN played_percent >= 20 THEN '20p'
    WHEN played_percent < 20 THEN 'less_than_20'
    ELSE 'unknown'
  END AS played,
  COUNT(*) AS views
FROM (
    SELECT
      media_src,
      root_id,
      MAX(media_played_percent) AS played_percent
    FROM
      your_database.weblog -- 変更してください
    WHERE
      TD_TIME_RANGE(time,
        DATE_FORMAT(DATE_ADD('hour',
            9-24, -- 日本時間で過去24時間
            NOW()),
          '%Y-%m-%d %H:%i:%s'),
        NULL,
        'JST')
      AND action IN(
        'timeupdate',
        'ended'
      )
      AND category = 'video'
      AND media_src != ''
    GROUP BY
      media_src,
      root_id
  )
GROUP BY
  1,
  2
;
```

### ページごとの滞在時間の中央値

```sql
SELECT
  td_path,
  APPROX_PERCENTILE(
    elapsed_ms,
    0.5
  ) / 1000 AS median_time_spent_sec
FROM (
    SELECT
      root_id,
      td_path,
      MAX(since_init_ms) AS elapsed_ms
    FROM
      your_database.weblog -- 変更してください
    WHERE
      TD_TIME_RANGE(time,
        DATE_FORMAT(DATE_ADD('hour',
            9-24, -- 日本時間で過去24時間
            NOW()),
          '%Y-%m-%d %H:%i:%s'),
        NULL,
        'JST')
      AND action = 'scroll'
      AND category = 'page'
    GROUP BY
      root_id,
      td_path
  )
GROUP BY
  td_path
;
```

### トップページにおける時間別RUM

```sql
SELECT
  TD_TIME_FORMAT(time,
    'yyyy-MM-dd HH:00:00',
    'JST') AS date_time,
  CASE
  WHEN performance_dcl < 1000 THEN 'less_than_1sec'
  WHEN (performance_dcl >= 1000 AND performance_dcl < 2000) THEN '1-2sec'
  WHEN (performance_dcl >= 2000 AND performance_dcl < 4000) THEN '2-4sec'
  WHEN (performance_dcl >= 4000 AND performance_dcl < 7000) THEN '4-7sec'
  WHEN (performance_dcl >= 7000 AND performance_dcl < 10000) THEN '7-10sec'
  WHEN performance_dcl > 10000 THEN 'more_than_10sec'
  ELSE 'unknown' END as dom_content_loaded,
  COUNT(*) AS pageviews
FROM
  your_database.weblog  -- 変更してください
WHERE
  TD_TIME_RANGE(time,
    DATE_FORMAT(DATE_ADD('hour',
      9 - (24 * 7), -- 日本時間で過去7日
      NOW()),
      '%Y-%m-%d %H:%i:%s'),
    NULL,
    'JST')
  AND action = 'rum'
  AND category = 'page'
  AND td_path = '/'
GROUP BY
  1,2
;
```

## ライセンスと著作権
この拡張は [Ingestly Tracking JavaScript](https://github.com/ingestly/ingestly-client-javascripthttps://github.com/ingestly/ingestly-client-javascript) からフォークしました。
