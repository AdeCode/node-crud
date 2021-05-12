module.exports = (app) => {
    const crud = require('../controllers/crud.controller');

    //create a new crud data
    app.post('/crud', crud.create);

    //get all created crud record
    app.get('/crud', crud.findAll);

    //get a particular crud record
    app.get('/crud/:crudId', crud.findOne);

    //update a crud record with the crudId
    app.put('/crud/:crudId', crud.update);

    //Delete a particular record usin crudId
    app.delete('/crud/:crudId', crud.delete);
    
}