var assert = require('assert');
var Graph = require('./');

suite('Graph', function () {
    suite('default construction', function () {
        var vertex = new Graph.vertex();

        test('level', function () {
            assert.equal( vertex.level(), 0 );
        });

        test('vertex', function () {
            assert.equal( vertex.edge(), 0 );
        });

        test('is root', function () {
            assert.ok( vertex.isRoot() );
        });
    });

    suite('modified construction', function () {
        var vertex = new Graph.vertex({
            level: 1,
            edge: [ 2 ]
        });

        test('level', function () {
            assert.equal( vertex.level(), 1 );
        });

        test('vertex', function () {
            assert.equal( vertex.edge(), 1 );
        });
    });

    suite('seed', function () {
        var vertex = new Graph.vertex();

        test('in vertex', function () {
            vertex.seed();
        });

        test('correct number of edges', function () {
            assert.equal( vertex.edge(), 1 );
        });

        test('edge return a vertex', function () {
            assert.deepEqual( vertex.edge( 0 ), vertex.internal.edge[0] );    
        });

        test('correct level', function () {
            assert.equal( vertex.edge(0).level(), 1 );
        });

        test('level not is of root', function () {
            assert.equal( vertex.edge(0).isRoot(), false );
        });
    });

    suite('information', function () {
        var vertex = new Graph.vertex();

        var infos = [
            {
                info: {
                    name: 'John Doe',
                    age: 18,
                    genre: 'male',
                    eyeColor: 'blue'
                },

                interest: {
                    age: 17,
                    genre: 'female',
                    eyeColor: 'green'
                }
            },
            {
                info: {
                    name: 'Mila Red',
                    age: 17,
                    genre: 'male',
                    eyeColor: 'green'
                },

                interest: {
                    age: 18,
                    genre: 'male',
                    eyeColor: 'blue'
                }
            }
        ];

        vertex.seed();

        test('set informations', function () {
            vertex.data( infos[0] );
            vertex.edge(0).data( infos[1] );
        });

        test('get informations', function () {
            assert.deepEqual( vertex.data(), infos[0] );
            assert.deepEqual( vertex.edge(0).data(), infos[1] );
        });

        test('proximity', function () {
            assert.deepEqual( 
                vertex.proximity('interest', 'info'), 
                [ 1 ]
            );
        });

        test('find', function () {
            assert.deepEqual(
                vertex.find( 'info', { age: 17 } ),
                [ infos[1]['info'] ]
            );
        });
    });

    suite('Graph', function () {
        var wire = Graph.init({
            color: 'red'
        });

        test('init with data', function () {
            assert.deepEqual(
                wire.data(), { color: 'red' }
            );
        });

        test('seed with data', function () {
            wire.seed({
                color: 'black'
            });

            assert.deepEqual(
                wire.edge(0).data(), { color: 'black' }
            );
        });
    });

    suite('Graph relation', function () {
        var wire = Graph.init(),
            data = [
                {
                    name: 'Roger Smith'
                },

                {
                    name: 'Jack White'
                },

                {
                    name: 'Jack Black'
                }
            ];


            wire
                .seed( data[ 0 ] )
                .seed( data[ 1 ] )
                .seed( data[ 2 ] );

        test('get siblings', function () {
            assert.deepEqual(
                wire.getSiblingsOf( 1 ),
                [ data[ 0 ], data[ 2 ] ]
            );
        });

        wire
            .edge( 0 )
            .seed( data[ 1 ] )
            .edge( 0 )
            .seed( data[ 2 ] );

        test('get childs', function () {
            assert.deepEqual(
                wire.getChildsOf( 0 ),
                [ data[ 1 ], data[ 2 ] ]
            );
        });
    });
});
