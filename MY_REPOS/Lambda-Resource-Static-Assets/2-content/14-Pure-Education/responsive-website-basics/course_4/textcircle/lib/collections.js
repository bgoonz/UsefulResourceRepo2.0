this.Documents = new Mongo.Collection('documents')
EditingUsers = new Mongo.Collection("editingUsers");
Comments = new Mongo.Collection("comments")
Comments.attachSchema(new simpleSchema({
    docid:{
        type:String
    },
    title:{
        type:String,
        label:'Title',
        max:200,
    },
    body:{
        type:String,
        label:'Comment',
        max:1000,
    }
}));
