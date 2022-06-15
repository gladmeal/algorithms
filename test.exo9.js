const readline = require( 'readline' );
const lines = [];
const terminal = readline.createInterface( process.stdin, process.stdout );

function separateData( line ) {  
    return new Uint8Array(
        line.split( '' ).map( i => parseInt( i ) )
    );
}

function createTuple( arr = [] ) {
    const 
        tuple = [ [], [] ];

        for( let i = 0; i < arr.length; i++ ) {
            if ( i % 2 === 0 ) {
                tuple[ 0 ].push( arr[ i ] );
            } else {
                tuple[ 1 ].push( arr[ i ] );
            }
        }
    return tuple;
}

function makAll( list = [ ] ) {
    let temp, data;
    const 
        result = [];
            if ( list.length <= 1 ) {
                result.push( list );
            } else if ( list.length === 2 ) {
                result.push( [ list[ 0 ], list[ 1 ] ] );
                result.push( [ list[ 1 ], list[ 0 ] ] );
            } else {
                for( let i = 0; i < list.length; i++ ) {
                    data = makAll( list.slice( 1 ) );
                    data.forEach( item => {
                        item.unshift( list[ 0 ] )
                        result.push( item )
                    } )

                    for ( let j = 1; j < list.length; j++ ) {
                        temp = list[ j - 1 ];
                        list[ j - 1 ] = list[ j ];
                        list[ j ] = temp;
                    }
                }
            }
    return result;
}

function init( line ) {
    let needed, final = [];
    const list = [];
    const 
        part = separateData( line ).sort( ( a, b ) => {
            return a < b ? 1 : -1;
        } );
            final = makAll( part );
            final.filter( item => {
                if ( item[ 0 ] === 0 || item[ 1 ] === 0 )
                    return false;
                    list.push( createTuple( item ) );
                return true;
            } );

        if ( !list.length ) {
            return 0;
        }

        needed =  list.map( item => {
            const 
                result = [ '', '', -1 ];

                item[ 0 ].forEach( item => {
                    result[ 0 ] += item 
                } )

                item[ 1 ].forEach( item => {
                    result[ 1 ] += item 
                } )

                result[ 0 ] = parseInt( result[ 0 ] );
                result[ 1 ] = parseInt( result[ 1 ] );
            result[ 2 ] = Math.abs( result[ 0 ] - result[ 1 ] );
            return result;
        } );

        needed.sort( function ( a, b ) {
            if ( a[ 2 ] < b[ 2 ] ) {
                return -1;
            }
            return 1;
        } );
    return needed[ 0 ][ 2 ] || 0;
}

terminal.on( 'line', ( data ) => {
    let n = 0;

    if ( lines.length ) {
        n = parseInt( lines[ 0 ] );
    } 

    lines.push( data );
    
    const 
        needed = lines.length - 1;

    if ( needed > 0 ) {
        console.log( `Case #${ needed }: ${ init( data ) }` );
        if ( needed === n ) {
                terminal.close();
            return;
        }  
    }
} );

terminal.on( 'close', () =>  {
    process.exit( 0 );
} );