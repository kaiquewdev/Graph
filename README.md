# Graph

Graph engine prototype.

# Installation

    npm install jug

# Init the graph

    var wire = jug.init();

# Init the graph with data

    var wire = jug.init({
        interest: {
            cloth: 't-shirt',
            color: 'red',
            size: 'medium'
        }
    });

# Seed node

    wire.seed();

# Seed node with data
    
    wire.seed({
        info: {
            cloth: 't-shirt',
            color: 'red',
            size: 'medium'
        } 
    });

# Access node

    wire.edge( 0 );

# Get distance between nodes

    // first argument is 'from' object
    // second argument is 'to' object
    wire.proximity('interest', 'info');

# Find a node

    wire.find( 'info', { color: 'red' } );

# Example

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
