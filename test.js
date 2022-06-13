const readline = require( 'readline' );
const lines = [];
const terminal = readline.createInterface( process.stdin, process.stdout );

function separateData( line ) {  
    return line.split( ' ' );
}

function  isValid( arr = [ ] ) {
    if ( !arr.length ) {
        return true;
    }

    for ( let i = 1; i < arr.length; i++ ) {
        if ( arr[ i ] <= arr[ i - 1 ] ) {
            return false;
        }
    }  
    return true;
}

function cleamData( arr = [] ) {
    return arr.map( item => (
        parseInt( item )
    ) );
}

function getBestNumber( upper, lower ) {
    if ( upper.length === lower.length ) {
        return 0;
    }
    
    if ( upper[ upper.length - 1 ] === '9' ) {
        return 9;
    }

    return parseInt( upper[ upper.length - 1 ] ) + 1; 
}

function init ( item ) {
    let parts = separateData( item );
    let cleam = cleamData( parts );
    let i = 0;
        while( !isValid( cleam ) ) {
            for (let index = 1; index < parts.length; index++) {
                const 
                    _this = parseInt( parts[ index ] ),
                    _prev = parseInt( parts[ index - 1 ] );
                if ( _this <= _prev ) {
                    i++;
                        parts[ index ] = `${ _this }` + getBestNumber( _prev + '', _this + '' );
                    continue;
                }
            }
            cleam = cleamData( parts );
        }
    return i;
}

const exo8 = function ( lines ) {
    ( lines ).filter( ( i, n ) =>  n % 2 === 1 ).forEach( ( item, index ) => {
        const 
            result = init( item );
        console.log( `Case #${ index + 1 }: ${ result }` );
    } );
};

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
    lines.push( data );
    
    const 
        needed = lines.length - 1;
    /** 
        *
        * here we have to manage when
        * the terminal will stop to receive 
        * terminal data 
    */

    if ( needed > 0 ) {
        if ( needed === n * 2 ) {
                terminal.close();
            return;
        }  
    }
    //terminal.write( '> ' );
} );

terminal.on( 'close', () =>  {
    exo8.call( {}, lines.slice( 1 ) );
} );