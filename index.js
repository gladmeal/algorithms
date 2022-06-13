const terminal = require( './terminal' );
const lines = [];
const used = process.argv[ 2 ] || 'exo7';

const exo7 = require( './utils/exo7' );
const exo8 = require( './utils/exo8' );
const exo9 = require( './utils/exo9' );

console.log( 'Enter your data' );

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
        lines.push( data.slice( 2 ) );
    } else {
        lines.push( data );
    }

    const 
        needed = lines.length - 1;
    /** 
        *
        * here we have to manage when
        * the terminal will stop to receive 
        * terminal data 
    */

    if ( needed > 0 ) {
        if ( used === 'exo7' && needed === n ) {
                terminal.close();
            return;
        } else if ( used === 'exo8' && needed * 2 === n ) {
                terminal.close();
            return;
        } else if ( used === 'exo9' ) {

        } 
    }
    terminal.write( '> ' );
} );

terminal.on( 'close', () =>  {
    switch( used ) {
        case 'exo7':
                exo7.call( {}, lines.slice( 1 ) );
            break;
    
        case 'exo8':
                exo8.call( {}, lines.slice( 1 ) );
            break;

        case 'exo9':
                exo9.call( {}, lines.slice( 1 ) );
            break;
    }
} );