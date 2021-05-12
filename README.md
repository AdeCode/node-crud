# node-crud
Perform a CRUD operation in nodejs

app.post('/crud', crud.create);
This is the route where you create records to be saved in the database

app.get('/crud', crud.findAll);
This route queries all the records available in the database

app.get('/crud/:crudId', crud.findOne);
This route lets you query a particular recordd from the database

app.put('/crud/:crudId', crud.update);
This route let you update a particular record in the database by supplying the id of the record

app.delete('/crud/:crudId', crud.delete);
This is the route where a record can be removed from the database by supplying the Id of such record.
