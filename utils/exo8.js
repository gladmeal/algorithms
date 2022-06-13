function separateData( line ) {  
    return line.split( ' ' );
};

function  isValid( arr = [ ] ) {
    if ( !arr.length ) {
        return true;
    }

    for ( let i = 1; i < arr.length; i++ ) {
        if ( arr[ i ] < arr[ i - 1 ] ) {
            return false;
        }
    }  
    return true;
};

function cleamData( arr = [] ) {
    return arr.map( item => (
        parseInt( item )
    ) );
};

function init ( item ) {
    let parts = separateData( item );
    let cleam = cleamData( parts );
    let i = 0;
        while( !isValid( cleam ) ) {
            parts = parts.map( ( item, index ) => {
                if ( index === 0 )
                    return item;

                const 
                    _this = parseInt( item ),
                    _prev = parseInt( parts[ index - 1 ] );
                        if ( _this < _prev ) {
                            return `${ _this }${ (new String( _prev - _this )).charAt( 0 ) }`;
                        }
                return _this;
            } );
            cleam = cleamData( parts );
            i++;
        }
    return i;
}

module.exports = function ( lines ) {
    ( lines ).forEach( ( item, index ) => {
        if ( index % 2 === 1 ) {
            const 
                result = init( item );
            console.log( `Case #${ index + 1 }: ${ result }` );
        }
    } );
};