const aws = require('./../aws');
const uuid = require('uuid');

const tableName = process.env.AWS_TABLE_NAME || todo;

exports.getTodos = (req, res) => {
    const params = {
        TableName: tableName
    };

    aws.scan(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.json(data.Items);
        }
    });
}

exports.createTodo = (req, res) => {
    const item = req.body;
    item._id = uuid.v1();
    item.completed = false;

    const params = {
        TableName: tableName,
        Item: item
    };

    aws.put(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.json(data);
        }
    });
}

exports.updateTodo = (req, res) => {
    const item = req.body;

    const params = {
        TableName: tableName,
        Key: {
            _id: item._id
        },
        UpdateExpression: 'set completed = :val',
        ExpressionAttributeValues: {
            ':val': item.completed
        },
        ReturnValues: 'ALL_NEW'
    }

    aws.update(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.json(data);
        }
    });
}

exports.deleteTodo = (req, res) => {
    const itemId = req.params.id;
 
    const params = {
        TableName: tableName,
        Key: {
            _id: itemId
        }
    }

    aws.delete(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.json(data);
        }
    });
}