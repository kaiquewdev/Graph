(function () {
    'use strict';
    var knn = require('knn'),
        _ = require('underscore');

    var Vertex = function Vertex ( obj ) {
        var self = this,
            std = {
                internal: {
                    level: 0,
                    edge: [],
                    data: {}
                }    
            };

        self.internal = ( obj === undefined ) ? std['internal'] : obj ;

        self.level = function () {
            var self = this;
            return self.internal.level;
        };

        self.edge = function ( index ) {
            var self = this,
                out = self.internal.edge;

            if ( index !== undefined ) {
                out = ( out[ index ] === undefined ) ? -1 : out[ index ];    
            } else {
                out = out.length;    
            }

            return out;
        };

        self.seed = function ( data ) {
            var self = this,
                vertex = new Vertex();

            vertex.internal.level = self.internal.level + 1;

            if ( data !== undefined ) vertex.data( data );
            self.internal.edge.push( vertex );

            return self;
        };

        self.isRoot = function () {
            var self = this,
                out = false;

            out = ( self.level() === 0 );

            return out;
        };

        self.data = function ( obj ) {
            var self = this,
                out = self.internal;

            if ( obj !== undefined ) {
                out['data'] = ( obj === undefined ) ? -1 : obj;    
                out = self;
            } else {
                out = out['data'];    
            }

            return out;
        };

        self.proximity = function ( from, to ) {
            var self = this,
                out = [],
                edgeData = null;

            edgeData = self.internal['edge'].map(function ( vertex ) {
                return vertex.data()[ to ];
            });

            out = knn.neighbors( self.data()[ from ], edgeData );

            return out;
        };

        self.find = function ( type, query ) {
            var nodes = _.where( self.internal['edge'].map(function ( node ) {
                    return node.data()[ type ];
                }), query ),
                out = nodes;

            return out;
        };

        return self;
    };

    var Graph = function () {
        var self = this;

        self.vertex = Vertex;

        self.init = function ( data ) {
            if ( data !== undefined )
                return ( new self.vertex ).data( data );
            return new self.vertex();    
        };

        return self;
    };

    module.exports = new Graph(); 
}).call( this );
