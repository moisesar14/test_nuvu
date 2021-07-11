const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const _ = require('underscore');
const router = Router();

const json_data = fs.readFileSync('src/data.json', 'utf-8');
const objData = json_data == "" ? [] : JSON.parse(json_data);

router.post('/', (req, res) =>{

    const {  token } = req.body;
    if (!token) {
        res.json('Estructura Invalida');
    }else{
        if (token == "") {
            res.json('POR FAVOR INGRESE EL TOKEN!')
        } else {
            const valUser = objData.filter( usuario => usuario.token === token ); 
            console.log(objData);
            if (valUser.length > 0) {
                const [{ 
                    uuid,
                    num_Doc,
                    tipo_Doc,
                    nombres,
                    apellidos,
                    username,
                    password,
                    email,
                    token,
                    type_card, 
                    num_card, 
                    last_four_digits, 
                    CVV, 
                    year_exp, 
                    month_exp
                }] = valUser;
            
                const register = {
                    uuid,
                    num_Doc,
                    tipo_Doc,
                    nombres,
                    apellidos,
                    username,
                    password,
                    email,
                    token: "",
                    type_card, 
                    num_card, 
                    last_four_digits, 
                    CVV, 
                    year_exp, 
                    month_exp
                };

                const objData_Reg = objData.filter( usuario => usuario.token != token);
                
                objData_Reg.push(register);

                const json_data = JSON.stringify(objData_Reg);
                fs.writeFileSync('src/data.json', json_data, 'utf-8');
                res.json({Message: "Session terminada."})
            } else {
                res.json('El token es incorrecto.')
            }
            
        }
    }
    
});


module.exports = router;