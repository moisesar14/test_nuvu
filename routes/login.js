const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const _ = require('underscore');
const router = Router();

const json_data = fs.readFileSync('src/data.json', 'utf-8');
const objData = json_data == "" ? [] : JSON.parse(json_data);

router.post('/', (req, res) =>{

    const {  username, password } = req.body;
    if (!username || !password) {
        res.json('Estructura Invalida');
    }else{
        if (username == "" || password == "") {
            res.json('POR FAVOR DIGITE LAS CREDENCIALES!')
        } else {
            const valUser = objData.filter( usuario => usuario.username === username && (bcrypt.compareSync(password,usuario.password))); 
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
                var newToken = "";
                
                if (token == "") {
                    newToken = jwt.sign({user: username}, 'my_token')
                    res.json({Message: "Token",Token: newToken});
                } else {
                    res.json({Message: "Token",Token: token});
                }
                //res.json('TODO BIEN')
                const register = {
                    uuid,
                    num_Doc,
                    tipo_Doc,
                    nombres,
                    apellidos,
                    username,
                    password,
                    email,
                    token: token == "" ? jwt.sign({user: username}, 'my_token') : token,
                    type_card, 
                    num_card, 
                    last_four_digits, 
                    CVV, 
                    year_exp, 
                    month_exp
                };

                console.log(register);
                

                const objData_Reg = objData.filter( usuario => usuario.username != username);
                console.log("Objeto Data  Filtrado sin usuario actual: ",objData_Reg);
                
                objData_Reg.push(register);
                console.log("Objeto Data  Filtrado con usuario actual: ",objData_Reg);

                const json_data = JSON.stringify(objData_Reg);
                fs.writeFileSync('src/data.json', json_data, 'utf-8');

            } else {
                res.json('Los datos de usuario y contraseña son incorrectos.')
            }
            
        }
    }
    
});


module.exports = router;