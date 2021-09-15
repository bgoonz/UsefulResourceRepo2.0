const {
    sequelize,
    Cookie
} = require( "./models" )

async function main() {

    // await Cookie.create({
    //     name: "Choclate Chip",
    //     flavor: ""
    // })
    // console.log("Hey please insert a password ")

    // await Cookie.create({
    //     name: "Sugar Cookie",
    //     flavor: "Sugar"
    // })

    // const choclateChip = await Cookie.findByPk(31);
    // // const sugarCookie = await Cookie.findAll({ where: { name: "Sugar Cookie" } });

    // const sugarCookie = await Cookie.findOne({ where: { name: "Sugar Cookie" } });
    // console.log(choclateChip.toJSON());
    // choclateChip.flavor = "Chip";
    // await choclateChip.save()
    // console.log(choclateChip.toJSON());
    // console.log(sugarCookie.toJSON());

    // await choclateChip.destroy();

    await sequelize.transaction( async ( tx ) => {
        const sugar = await Cookie.findOne( {
            where: {
                name: "Sugar Cookie"
            }
        }, {
            transaction: tx
        } );
        // const choclate = await Cookie.findOne({ where: { name: "Choclate Chip" } }, { transaction: tx });
        console.log( sugar )
        sugar.flavor = "SUGAR!!!!!!";
        await sugar.save( {
            transaction: tx
        } );
        // choclate.flavor = "CHOCLATE!!!!";
        // await choclate.save({ transaction: tx });
    } );


    await sequelize.close();

}

main();
