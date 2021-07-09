  center: new OpenLayers.LonLat(-7837508, 4537508),
    map: {
      allOverlays:false,
       maxExtent: new OpenLayers.Bounds(-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892),
       numZoomLevels: 8,
       maxResolution: 156543.0339,
       controls: [new OpenLayers.Control.LayerSwitcher(), new OpenLayers.Control.TouchNavigation({
       dragPanOptions: {
        enableKinetic: true
       }
      }), new OpenLayers.Control.Zoom()]
    },
                        layers: [
                            new OpenLayers.Layer.OSM("OpenStreetMap", null, {
                                transitionEffect: "resize",
                                attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                            }),
                            new OpenLayers.Layer.XYZ("WP Base Layer - XYZ",
                                    "http://media.washingtonpost.com/wp-srv/special/cartography/tilesets/cultural/reference/basic/${z}_${x}_${y}.gif",
                                    {
                                        isBaseLayer: true,
                                        projection: new OpenLayers.Projection("EPSG:900913"),
                                        maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
                                        maxResolution: 156543.0339
                                    }),
                            new OpenLayers.Layer.WMS( "OpenLayers Basic WMS",
                                    "http://vmap0.tiles.osgeo.org/wms/vmap0",
                                    {layers: 'basic'},
                                    {isBaseLayer:true}),
                            new OpenLayers.Layer.TMS("TMS-Temps, ESPG4:326",
                                    "http://geo.jbjonesjr.com/geoserver/gwc/service/tms/",
                                    {
                                        layername: "jbjonesjr-ws1%3Ageolocated_conditions@EPSG%3A4326@jpeg",
                                        projection: new OpenLayers.Projection("EPSG:4326"),
                                        maxExtent:new OpenLayers.Bounds(-180,-90,180,90),
                                        maxResolution: 360/512/16,
                                        isBaseLayer: false,
                                        type: "png"
                                    }
                            ),
                            new OpenLayers.Layer.TMS("TMS-Temps, ESPG4:900913",
                                    "http://geo.jbjonesjr.com/geoserver/gwc/service/tms/",
                                    {
                                        layername: "jbjonesjr-ws1%3Ageolocated_conditions@EPSG%3A900913@jpeg",
                                        isBaseLayer: false,
                                        type: "png"
                                    }
                            ),
                            new OpenLayers.Layer.WMS(
                                    "Current temperature",
                                    "http://geo.jbjonesjr.com/geoserver/jbjonesjr-ws1/wms",
                                    {
                                        LAYERS: 'jbjonesjr-ws1:geolocated_conditions',
                                        STYLES: 's_temperature',
                                        transparent: true,
                                        format: 'image/png'
                                    },
                                    {
                                        singleTile: false,
                                        //ratio: 1,
                                        //maxResolution: 360 / 512 / 16,
                                       // projection: new OpenLayers.Projection("EPSG:4326"),
                                       // maxExtent: new OpenLayers.Bounds(-180, -90, 180, 90),
                                        isBaseLayer: false//,
                                        //yx: {'EPSG:4326': true}
                                    }
                            )
                        ]
                    }