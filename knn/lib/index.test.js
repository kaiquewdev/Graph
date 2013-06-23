var assert = require('assert'),
    knn = require('./index');

suite('K-nn', function () {
    suite('distance', function () {
        test('close', function () {
            var dist = knn.distance(
                [1, 2], 
                [1, 2]
            );    
            assert.equal(
                dist, 0
            );
        });

        test('away', function () {
            var dist = knn.distance(
                [1, 2],
                [4, 5]
            );
            assert.ok(
                dist > 0 
            );
        });
    });

    suite('Objects and utils', function () {
        test('keys', function () {
            var a = {
                a: 1,
                b: 2
            };    

            assert.deepEqual(
                knn.keys(a),
                ['a', 'b']
            );
        });

        test('values', function () {
            var a = {
                a: 1,
                b: 2
            };

            assert.deepEqual(
                knn.values(a),
                [ 1, 2 ]
            );
        });

        test('duplicity', function () {
            var a = ['a', 'b', 'c', 'c'];    

            assert.deepEqual(
                knn.duplicity(a),
                ['a', 'b', 'c']
            );
        });

        test('detach', function () {
            var a = {
                a: 1,
                b: 2
            },
            caseObject = knn.detach( a );    

            assert.deepEqual(
                caseObject.keys,
                ['a', 'b']
            );

            assert.deepEqual(
                caseObject.values,
                [1, 2]
            );
        });
        
        test('merge', function () {
            var a = ['a', 'b'],
                b = ['b', 'b', 'c'];

            assert.deepEqual(
                knn.merge( a, b ),
                ['a', 'b', 'c']
            );
        });

        test('isRegExp', function () {
            assert.ok(
                knn.isRegExp(/simple test/)
            );
        });

        test('isArray', function () {
            assert.ok(
                knn.isArray([1, 2, 3])
            );    
        });

        test('isObject', function () {
            assert.ok(
                knn.isObject({ a: 1, b: 2, c: 3 })
            );    
        });

        test('has key', function () {
            var o = {
                a: 1,
                b: 2
            };

            assert.ok(
                knn.hasKey( o, 'a' )
            );
        });

        test('has value', function () {
            var o = {
                a: 1,
                b: 2,
                c: 'simple test',
                d: [ 1, 2, 3 ],
                e: { a: 1, b: 2, c: 3 }
            };    

            assert.ok(
                knn.hasValue( o, 'a', 1 )
            );

            assert.ok(
                knn.hasValue( o, 'c', /simple/ )
            );

            assert.ok(
                knn.hasValue( o, 'd', [ 1, 2, 3 ] )
            );

            assert.ok(
                knn.hasValue( o, 'e', { a: 1, b: 2, c: 3 } )
            );
        });
    });

    suite('Neighbor', function () {
        test('close', function () {
            var c = { a: 1, b: 2 },
                n = { a: 1, b: 2 };

            assert.equal(
                knn.neighbor( c, n ),
                0
            );
        });

        test('away', function () {
            var c = { a: 1, b: 3 },
                n = { c: 2, d: 5 };

            assert.ok(
                knn.neighbor( c, n ) > 0
            );
        });

        test('half', function () {
            var c = { a: 1, b: 2, c: 3 },
                n = { d: 1, e: 5, f: 4 };

            assert.equal(
                knn.half( c, [n, n] ),
                ( ( 9 + 9 + 9 + 9 ) / 2 )
            );
        });
    });
    
    suite('Neighbors', function () {
        test('show neighbors', function () {
            var c = { a: 1, b: 2 },
                cases = [
                    { c: 1, b: 2 },
                    { a: 1, b: 2 }
                ];

            assert.deepEqual(
                knn.neighbors( c, cases ),
                [ 2, 0 ]
            );
        });    
    });
});
