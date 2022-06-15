const readline = require( 'readline' );
const lines = [];
const terminal = readline.createInterface( process.stdin, process.stdout );

function createList() {
    return {
        root: null,
        length: 0,
        isRoot() {
            return this.root !== null;
        },
        getRoot() {
            return this.root;
        },
        createNode( val ) {
            return {
                value: val,
                next: null
            };
        },
        add( val ) {
            const 
                newNode = this.createNode( val );
                if ( this.root ) {
                    newNode.next = this.root;
                    this.root = newNode;
                } else {
                    this.root = newNode;
                }
                this.length++;
            return this;
        },
        each( fn ) {
            if ( typeof fn === 'function' ) {
                let current = this.root;
                while( current ) {
                        fn.call( this, current );
                    current = current.next;
                }
            }
        }
    };
}

function separateData( line ) {  
    return line.split( '' ).map( i => parseInt( i ) );
}

function createTuple( arr = [] ) {
    const 
        tuple = [ [], [] ];
            for( let i = 0; i < arr.length; i++ ) {
                i % 2 === 0 ? tuple[ 0 ].push( arr[ i ] ) : tuple[ 1 ].push( arr[ i ] );
            }
    return tuple;
}

function makAll( list = [ ] ) {
    let temp, data;
    const 
        result = createList();
            if ( list.length <= 1 ) {
                result.add( list );
            } else if ( list.length === 2 ) {
                result.add( [ list[ 0 ], list[ 1 ] ] );
                result.add( [ list[ 1 ], list[ 0 ] ] );
            } else {
                for( let i = 0; i < list.length; i++ ) {
                    data = makAll( list.slice( 1 ) );
                    data.each( item => {
                            item.value.unshift( list[ 0 ] );
                        result.add( item.value );
                    } );
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
            final.each( item => {
                if ( item.value[ 0 ] !== 0 && item.value[ 1 ] !== 0 ) {
                    list.push( createTuple( item.value ) );
                }
            } );
        if ( !list.length ) {
            return 0;
        }
        needed =  list.map( item => {
            const 
                result = [ '', '', -1 ];
                item[ 0 ].forEach( item => {
                    result[ 0 ] += item 
                } );
                item[ 1 ].forEach( item => {
                    result[ 1 ] += item 
                } );
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
    let 
        n = 0;
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

terminal.on( 'close', () => (
    process.exit( 0 )
) );