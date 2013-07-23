# Graph

Graph engine prototype.

I'm trying to build a graph engine, which works on any database supported by it. 
I know it will be necessary to build mediators for this. 
So will be the next step, but before anything else, 
I will build features that deal with the abstract concept of it.

Some of the features that will be included:

* Comparison graphs
* difference
* union
* intersection
* Tree decisions
* Walk through the tree
* versioning
* Kicking actions performed

Are things, basic I work for the "jug" support. And be more if i can.

## Installation

    npm install jug

## Init the graph

    var wire = jug.init();

## Init the graph with data

    var wire = jug.init({
        interest: {
            cloth: 't-shirt',
            color: 'red',
            size: 'medium'
        }
    });

## Seed node

    wire.seed();

## Seed node with data
    
    wire.seed({
        info: {
            cloth: 't-shirt',
            color: 'red',
            size: 'medium'
        } 
    });

## Access node

    wire.edge( 0 );

## Get distance between nodes

    // first argument is 'from' object
    // second argument is 'to' object
    wire.proximity('interest', 'info');

## Find a node

    wire.find( 'info', { color: 'red' } );

## Verify the level

    wire.edge( 0 ).level();

## Verify if the current node is the root

    wire.isRoot();

## Getting childs of an specified edge

    wire.getChildsOf( 0 );

## Getting parents of an specified level and edge
    
    wire.getParentsFrom( 1, 0 );

## Getting the length of childs of an specified edge
    
    wire.getScopeOf( 0 );

## Getting siblings of current level, excluding the index indicated
    
    wire.getSiblingsOf( 1 );

## Example

    var Jug = require('jug');
    var util = require('util');

    var root = Jug.init();

    root
        .seed()
        .seed();

    root.data({
        interest: {
            genre: 'Action',
            year: 2014,
            stars: [ 'Eva Green', 'Duck Dogers' ]
        }    
    });

    root.edge( 0 ).data({
        info: {
            name: '300: Rise of an Empire',
            genre: 'Action',
            stars: [ 'Eva Green', 'Duck Dogers' ],
            year: 2014
        } 
    });

    root.edge( 1 ).data({
        info: {
            name: 'Man of Steel',
            genre: 'Action',
            stars: [ 'Henry Cavill' ],
            year: 2013
        }    
    });

    var distance = root.proximity('interest', 'info'); 
    var close = distance.indexOf( 0 );
    var nodeData = root.edge( close ).data();

    console.log(
        'distance: %s\ndata: %s',
        distance.join(', '),
        util.inspect( nodeData['info'] )
    );

## To contribute with anithing

First of all:

    git clone https://github.com/kaiquewdev/Graph

enter in the `Graph` directory and run:

    sudo npm install

after all dependencies was solved, install the `mocha`:

    sudo npm install -g mocha

and test:

    mocha -u tdd lib/index.test.js

Yeah, read the code and contribute with ideas or coding.

## Branch pattern

### Feature

    git checkout -b feature/name-of-the-responsability

### Fix

    git checkout -b fix/name-of-the-responsability

## Commit pattern

    * Title of the feature or fix
    * 80 columns

#### Make a good art, with the code.
