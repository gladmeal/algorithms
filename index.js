const terminal = require( './terminal' );
const lines = [];
const used = process.argv[ 2 ] || 'exo7';

terminal.prompt();

terminal.on( 'line', ( data ) => {
    let n = 0;
    if ( lines.length ) {
        /** 
            *
            * the first line give the 
            * number of test case 
        */
        n = parseInt( lines[ 0 ] );
    }
} )