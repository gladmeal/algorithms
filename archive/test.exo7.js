const readline = require( 'readline' );
const lines = [];
const terminal = readline.createInterface( process.stdin, process.stdout );

function separateData( line ) {  
    return line.split( '' );
}

function createTuple( arr = [] ) {
    const 
        tuple = {
            x: [],
            y: []
        };

        if ( arr[ 0 ] === '0' ) {
                arr.push( arr.shift() );
            return createTuple( arr );
        }
    
        for( let i = 0; i < arr.length; i++ ) {
            let j =  parseInt( arr[ i ].trim() || '0' );
            if ( i % 2 === 0 ) {
                tuple.y.push( j );
            } else {
                tuple.x.push( j );
            }
        }
    return tuple;
}

function init( line ) {
    let temp, needed;
    const list = [];
    const 
        part = separateData( line ).sort( ( a, b ) => {
            const 
                _a = parseInt( a ),
                _b = parseInt( b );
            return _a < _b ? 1 : -1;
        } );
            for( let i = 0; i < part.length; i++ ) {
                for ( let j = 1; j < part.length; j++ ) {
                    list.push( createTuple( part ) );
                    temp = part[ j - 1 ];
                    part[ j - 1 ] = part[ j ];
                    part[ j ] = temp;
                }
            }

        
        needed = list.filter( ( item ) => {
            if ( item.x[ 0 ] === 0 || item.y[ 0 ] === 0 ) {
                return false;
            }
            return true;
        } );

        if ( !needed.length ) {
            return 0;
        }

        needed =  needed.map( item => {
            const 
                result = { 
                    x: '',
                    y: '',
                    dif: -1 
                };

                item.x.forEach( item => {
                    result.x += item 
                } )

                item.y.forEach( item => {
                    result.y += item 
                } )

                result.x = parseInt( result.x );
                result.y = parseInt( result.y );
            result.dif = Math.abs( result.x - result .y );
            return result;
        } );
        console.log( needed );

        needed.sort( function ( a, b ) {
            if ( a.dif < b.dif ) {
                return -1;
            }
            return 1;
        } );
    return needed[ 0 ].dif || 0;
}

const exo7 = function ( lines ) {
    ( lines ).forEach( ( item, index ) => {
        const 
            result = init( item );
        console.log( `Case #${ index + 1 }: ${ result }` );
    } );
};

terminal.prompt();

terminal.on( 'line', ( data ) => {
    let n = 0;

    if ( lines.length ) {
        n = parseInt( lines[ 0 ] );
    } 

    lines.push( data );
    
    const 
        needed = lines.length - 1;

    if ( needed > 0 ) {
        if ( needed === n ) {
                terminal.close();
            return;
        }  
    }
} );

terminal.on( 'close', () =>  {
    exo7.call( {}, lines.slice( 1 ) );
} );