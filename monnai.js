function monnai( ap, dep ) {
    if ( dep % 25 !== 0 && dep % 10 === 0 )
        return -1;
    let res = ap - dep; 
    const result = [];
    const poss = [ 10000, 5000, 2000, 1000, 500, 100, 50, 25, 10 ];

        if ( res < 0 ) {
            return -1;
        }

        label: while( res > 0 ) {
            let needed = 0;
            for ( let i = 0; i < poss.length; i++ ) {
                if ( poss[ i ] <= res ) {
                    needed = poss[ i ];
                    break;
                }
            }

            if ( needed ) {
                result.push(needed);
                res -= needed;
            } else {
                break label;
            }
        }

    return result;
}

console.log( monnai( 10000, 2350 ) );