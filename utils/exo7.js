function separateData( line ) {  
    return line.split( ' ' );
};

function createTuple( arr = [] ) {
    const 
        tuple = {
            x: [],
            y: []
        };
    
        for( let i = 0; i < arr.length; i++ ) {
            let j =  parseInt( arr[ i ].trim() || '0' );
            if ( j % 2 === 0 ) {
                tuple.y.push( j );
            } else {
                tuple.x.push( j );
            }
        }
    return tuple;
};

function init( line ) {
    let temp, needed;
    const list = [];
    const 
        part = separateData( line );
            for( let i = 0; i < part.length; i++ ) {
                temp = part[ 0 ];
                for ( let j = 1; j < part.length; j++ ) {
                    part[ j - 1 ] = part[ j ];
                }
                part[ part.length - 1 ] = temp;
                list.push( createTuple( part ) );
            }
        
        needed = list.filter( ( item ) => {
            if ( item.x[ 0 ] === 0 || item.y[ 0 ] === 0 ) {
                return false;
            }
            return true;
        } );

        needed =  list.map( item => {
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

        needed.sort( function ( a, b ) {
            if ( a.dif < b.dif ) {
                return -1;
            }
            return 1;
        } );
    return needed[ 0 ].dif || 0;
};

module.exports = function ( lines ) {
    ( lines ).forEach( ( item, index ) => {
        const 
            result = init( item );
        console.log( `Case #${ index + 1 }: ${ result }` );
    } );
};