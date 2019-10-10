// Init TD JS SDK
var td = new Treasure({
    database: 'your_db_name',
    writeKey: 'your_api_write_key',
    host: 'in.treasuredata.com',
    startInSignedMode: true
});

// Track everything by TD JS SDK Extension
(function () {
    // Cut the mustard
    if ('addEventListener' in window &&
        'td' in window &&
        'tdext' in window
    ) {
        // Init TD Extension
        tdext.init({
            table: 'weblog',
            eventName: 'TDExtRecurringEvent',
            eventFrequency: 250,
            targetWindow: 'self',
            tdNs: 'td',
            options: {
                unload: {
                    enable: true
                },
                clicks: {
                    enable: true,
                    targetAttr: 'data-trackable'
                },
                scroll: {
                    enable: true,
                    threshold: 2,
                    granularity: 20,
                    unit: 'percent'
                },
                read: {
                    enable: true,
                    threshold: 2,
                    granularity: 20,
                    target: window.document.getElementById('article')
                },
                media: {
                    enable: true,
                    heartbeat: 5
                },
                form: {
                    enable: true,
                    targets: [].slice.call(window.document.getElementsByTagName('form'))
                }
            }
        });

        // Set a Root ID for events dispatched by other than Extension
        td.set('$global', 'root_id', tdext.rootId);

        // Track PV
        tdext.trackPageview();
    }
}());
