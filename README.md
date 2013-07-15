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

# Examples

Use `node examples/interest.js` to see the interest example in action. 
