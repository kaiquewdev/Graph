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
                    data: {},
                    parent: null
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
            var parent = self,
                self = this,
                vertex = new Vertex();

            vertex.internal.parent = parent;
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
            var out = [],
                nodes = self.internal['edge'];

            function typeHandler ( node ) {
                if ( type !== undefined ) {
                    return node.data()[ type ];
                } else {
                    return node.data();
                }
            }

            out = _.where( _.map( nodes, typeHandler ), query );

            return out;
        };

        self.getSiblingsOf = function ( index ) {
            var out = [],
                nodes = self.internal['edge'];

            _.map( nodes, function ( node, i ) {
                if ( index !== i )
                    out.push( node.data() );
            });

            return out;
        };

        self.getChildsOf = function ( edge ) {
            var out = [],
                selection = self.edge( edge )['internal']['edge'];

            while ( selection.length > 0 ) {
                _.map( selection, function ( node ) {
                    out.push( node.data() );
                });

                selection = selection[ edge ]['internal']['edge'];
            }

            return out;
        };

        self.getParentsFrom = function ( level, edge ) {
            var out = [],
                selection = self,
                nodes = selection['internal']['edge'];

            while ( nodes.length > 0 ) {
                if ( selection.level() === level ) break;
                _.map( nodes, function ( node ) {
                    out.push( node.data() );
                });

                selection = nodes[ edge ];
                nodes = selection['internal']['edge'];
            }

            out = out.reverse();

            return out;
        };

        self.getScopeOf = function ( edge ) {
            return self.getChildsOf( edge ).length;
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
