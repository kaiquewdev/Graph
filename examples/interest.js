var Graph = require('../');
var util = require('util');

var root = Graph.init();

root
    .seed()
    .seed();

root.data({
    interest: {
        genre: 'Action',
        year: 2014,
        star: 'Eva Green'
    }    
});

root.edge( 0 ).data({
    info: {
        name: '300: Rise of an Empire',
        genre: 'Action',
        star: 'Eva Green',
        year: 2014
    } 
});

root.edge( 1 ).data({
    info: {
        name: 'Man of Steel',
        genre: 'Action',
        star: 'Henry Cavill',
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
