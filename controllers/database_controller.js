const { table } = require('console')
const { parse } = require('path')
const { json } = require('stream/consumers')
const db = require('../config/db_connection')

// searching number of rows actions
module.exports.home=function(req,res){
    return res.send("<h1>Welcome to database manager</h1>")
}

module.exports.searchform=function(req,res){
    var sql = "SHOW DATABASES WHERE `Database` NOT IN ('mysql', 'performance_schema', 'sys','information_schema')"
    var pass
    var pass2
    db.query(sql,function(error,result){
        if(error) throw error

        pass=Object.values(JSON.parse(JSON.stringify(result)));

        sql2="select table_schema as database_name, table_name from information_schema.tables where table_type = 'BASE TABLE' and table_schema not in ('information_schema','mysql','performance_schema','sys') order by database_name, table_name"
        db.query(sql2,function(error,result2){
            if(error) throw error
    
            pass2=Object.values(JSON.parse(JSON.stringify(result2)));



        return res.render('search',{
            databases:pass,
            tables:pass2
            })
        })

    })
}

module.exports.searchdb=function(req,res){
    var database = req.body.database
    var table = req.body.table
    var pagesize = parseInt(req.body.pagesize)
    var sql = `SELECT * FROM ${database}.${table} LIMIT ${pagesize}`// 'SELECT * FROM customers LIMIT ?;'
    db.query(sql,function(error,result){
        if(error)
        {        
            return res.send(`Following error in searching by id: ${error}`)
        }
        else if(result.length==0)
        {
            var reply = {
                "status": "error",
                "code": 0,
                "message": "No api found.",
                "document": ""
            }
            console.log(reply)
            return res.send('<h1>No record found corresponding to this id</h1>')
        }
        else
        {
            console.log(result)
            return res.send(' <h1>You have successfully searched the database</h1>')
        }
    })

}


// searching by id actions
module.exports.searchbyidform=function(req,res){
    var sql = "SHOW DATABASES WHERE `Database` NOT IN ('mysql', 'performance_schema', 'sys','information_schema')"
    var pass
    var pass2
    db.query(sql,function(error,result){
        if(error) throw error

        pass=Object.values(JSON.parse(JSON.stringify(result)));

        sql2="select table_schema as database_name, table_name from information_schema.tables where table_type = 'BASE TABLE' and table_schema not in ('information_schema','mysql','performance_schema','sys') order by database_name, table_name"
        db.query(sql2,function(error,result2){
            if(error) throw error
    
            pass2=Object.values(JSON.parse(JSON.stringify(result2)));


        return res.render('searchbyid',{
            databases:pass,
            tables:pass2
            })
        })

    })
}

module.exports.searchbyiddb=function(req,res){
    var database = req.body.database
    var table = req.body.table
    var id = parseInt(req.body.id)
    var sql = `SELECT * FROM ${database}.${table} WHERE id = ${id}`
    db.query(sql,function(error,result){
        
        if(error) 
        {
            return res.send(`Following error in searching by id: ${error}`)
        }
        else if(result.length==0)
        {
            var reply = {
                "status": "error",
                "code": 0,
                "message": "No api found.",
                "document": ""
            }
            console.log(reply)

            return res.send(reply)
        }
        else 
        {
            console.log(result)
            return res.send('<h1>You have successfully searched the database by id</h1>')
        }
    })
}

module.exports.findcols = function(req,res){
    var database = req.body.database
    var table = req.body.table
    var sql = `SHOW COLUMNS FROM ${database}.${table}`
    db.query(sql,function(error,result){
        if(error) throw (error)
        
        

        
    })
    
}









// module.exports.searchdb=function(req,res){
    
//     function select() {
//         var database = req.body.database
//         var table = req.body.table
//         var pagesize = parseInt(req.body.pagesize)
//         var sql = `SELECT * FROM ${database}.${table} LIMIT ${pagesize}`// 'SELECT * FROM customers LIMIT ?;'
//         return new Promise((resolve, reject) => {
//             db.query(sql, (err, result, field) => {
//             if(err) return reject(err);
//             return resolve(Object.values(JSON.parse(JSON.stringify(result))));
//         });
//         });
//     }
//     async function resultant() {
//         try{
//             const result=await select()
//             return result

//         }
//         catch(e){
//             console.log(e)
//             return
//         }
//       }
//     var resultantobject=resultant(); // yay!!
//     console.log(resultantobject)
//     res.send("<h1>Successfull search<h1>")
    
// }
            
