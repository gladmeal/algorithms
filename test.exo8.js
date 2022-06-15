const readline = require( 'readline' );
const lines = [];
const terminal = readline.createInterface( process.stdin, process.stdout );

function init ( item ) {
    let parts = item.trim().split( ' ' ).map( item => (
        BigInt( parseInt( item ) )
    ) );
    let i = 0, mul, res;
        for ( let index = 1; index < parts.length; index++ ) {
            const 
                _this = parts[ index ],
                _prev = parts[ index - 1 ];
            if ( _this <= _prev ) {
                res = _this;
                mul = 10n;
                    while( res <= _prev ) {
                        res = _this * mul;
                        if ( res <= _prev ) {
                            if ( ( res + ( mul - 1n ) ) > _prev ) {
                                res += _prev - res + 1n;
                            }
                        }

                        i++;
                        mul *= 10n;
                    }
                parts[ index ] = res;
            }
        }
    return i;
}

terminal.on( 'line', ( data ) => {
    let n = 0;

    if ( lines.length ) {
        n = parseInt( lines[ 0 ] );
    } 

    lines.push( data );
    
    const 
        needed = lines.length - 1;
        if ( needed != 0 && needed % 2 === 0  ) {
            console.log( `Case #${ ( needed ) / 2 }: ${ init( data ) }` );
        }
    if ( needed > 0 ) {
        if ( needed === n * 2 ) {
                terminal.close();
            return;
        }  
    }
} );

terminal.on( 'close', () =>  {
    process.exit( 0 );
} );