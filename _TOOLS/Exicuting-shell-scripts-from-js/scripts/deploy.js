( async function () {
    try {
        const yargs = require( 'yargs' );
        const exec = require( './utils' ).exec;

        // Define required arguments, help section and get arguments
        const argv = yargs
            .usage( `Usage: $0 <environment> [options]` ) // help "Usage" description
            .demandCommand( 1 ) // requiring 1 argument to be passed
            .option( 'skip-build', {
                describe: 'To skip build process',
            } )
            .help() // for --help and -h to work
            .argv;

        const ENVIRONMENT = argv._[ 0 ];
        let BUILD_OPTIONS = '';

        // Set options based on environment
        switch ( ENVIRONMENT ) {
            case 'integration':
                break;

            case 'staging':
                BUILD_OPTIONS = '--config config/webpack.staging.js';
                break;

            case 'production':
                BUILD_OPTIONS = '--config config/webpack.prod.js';
                break;

            default:
                throw new Error( `ERROR: wrong env as first argument: ${ ENVIRONMENT }` );
        }

        if ( !argv[ 'skip-build' ] ) {
            console.log( '[CLEANUP]' );
            await exec( 'rm -rf ./dist' );

            console.log( '[BUILDING]' );
            await exec( `webpack --progress --profile --bail ${ BUILD_OPTIONS }` );
        }

        console.log( '[UPLOADING]' );
        await exec( 'aws --region eu-west-1 s3 sync --acl public-read dist/ s3://my-bucket/' );
    } catch ( error ) {
        console.error( error );
    }
} )();
