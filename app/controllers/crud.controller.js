const Crud = require('../models/crud.model');

//create and save a new crud record

exports.create = (req, res) => {
    if (req.body.content){
        return res.status(400).send({
            message: "Please input the required record data"
        });
    }
        
    //creata a Crud record
    const crud = new Crud({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
    });

    //save record in the db
    crud.save()
    .then(data => {
        res.status(200).send(
                {
                    message: "Record created Successfully",
                    data
                }
            );
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Could not save data to the database"
        });
    });
};

//retrieve and return all crud records
exports.findAll = (req, res) => {
    Crud.find()
    .then(cruds => {
        res.status(200).send(
            {
                message: "Records retrieved Successfully",
                cruds
            }
        );
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Could not retrieve records from the database"
        });
    });
};

//find  a particular record with crudId
exports.findOne = (req, res) => {
    Crud.findById(req.params.crudId)
    .then(crud => {
        if (!crud) {
            return res.status(404).send({
                message: "Record id "+ req.params.crudId +" not found"
            });
        }
        res.status(200).send(
                {
                    message: "Record retrieved Successfully",
                    crud
                }
            );
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Record id "+ req.params.crudId +" not found"
            })
        }
        return res.status(500).send({
            message: "Unable to retrieve record id: "+req.params.crudId
        });
    });
};

//update a particular recors in the db
exports.update = (req, res) => {
    //validate request
    if(req.body.content){
        return res.status(400).send({
            message: "Record is empty"
        });
    }

    //find a record and update it with request body
    Crud.findByIdAndUpdate(req.params.crudId, {
        name: req.body.name,
        email: req.body.email,
        country: req.body.content
    }, {new: true})
    .then(crud => {
        if (!crud){
            return res.status(404).send({
                message: "Record id "+ req.params.crudId +" not found"
            });
        }
        res.status(200).send(
                {
                    message: "Record updated Successfully",
                    crud
                }
            );
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Record id "+ req.params.crudId +" not found"
            });
        }
        return res.status(500).send({
            message: "Error updating record id "+req.params.crudId
        });
    });
};

//delete a particular record in the db
exports.delete = (req, res) => {
    Crud.findByIdAndRemove(req.params.crudId)
    .then(crud => {
        if(!crud){
            return res.status(404).send({
                message: "Record id "+ req.params.crudId +" not found"
            });
        }       
        res.send({message: "crud record deleted successfulty"});
    }) .catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'Not Found'){
            return res.status(404).send({
                message: "Record id "+ req.params.crudId +" not found"
            });
        }
        return res.status(500).send({
            message: "Unable to delete record with id "+ req.params.crudId 
    
        });
    })
    
};