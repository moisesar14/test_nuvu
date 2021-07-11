const { Router } = require('express');
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const fs = require('fs');
const router = Router();

const json_data = fs.readFileSync('src/data.json', 'utf-8');
const objData = json_data == "" ? [] : JSON.parse(json_data);

router.post('/', (req,res) => {
    const { 
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
    } = req.body;

    const dato_register = objData.filter( usuario => usuario.token === token );
    
    if (dato_register.length > 0) {
        console.log("email: ", email);
        if (email === undefined) {
            console.log("email: ", email);
        } else {
            console.log("No existe email");
        }

        // const [{ 
        //     uuid,
        //     num_Doc,
        //     tipo_Doc,
        //     nombres,
        //     apellidos,
        //     username,
        //     password,
        //     email,
        //     token,
        //     type_card, 
        //     num_card, 
        //     last_four_digits, 
        //     CVV, 
        //     year_exp, 
        //     month_exp
        // }] = dato_register;
        const salt = bcrypt.genSalt(10);
        // let passwordHash = bcrypt.hashSync(password, 8);
                
        let new_Register = {
            uuid: dato_register[0].uuid,
            num_Doc: dato_register[0].num_Doc,
            tipo_Doc: tipo_Doc === undefined ? dato_register[0].tipo_Doc : tipo_Doc,
            nombres: nombres === undefined ? dato_register[0].nombres : nombres,
            apellidos: apellidos === undefined ? dato_register[0].apellidos : apellidos,
            username: dato_register[0].username,
            password: password === undefined ? dato_register[0].password : bcrypt.hashSync(password, 8),
            email: email === undefined ? dato_register[0].email : email,
            token: dato_register[0].token,
            type_card: type_card === undefined ? dato_register[0].type_card : type_card, 
            num_card: num_card === undefined ? dato_register[0].num_card : num_card, 
            last_four_digits: last_four_digits === undefined ? dato_register[0].last_four_digits: last_four_digits, 
            CVV: CVV === undefined ? dato_register[0].CVV : CVV, 
            year_exp: year_exp === undefined ? dato_register[0].year_exp : year_exp, 
            month_exp: month_exp === undefined ? dato_register[0].month_exp : month_exp
         
        };

        const objData_Reg = objData.filter( usuario => usuario.token != token);
        objData_Reg.push(new_Register);

        console.log(objData_Reg);
        const json_data = JSON.stringify(objData_Reg);

        fs.writeFileSync('src/data.json', json_data, 'utf-8');
        res.json('Registro Exitoso!')
        console.log('Registro Exitoso!')
        

    }else{
        res.json("Token no registrado. Inicie sesion nuevamente!", dato_register);
        console.log("Identificacion ya se encuentra registrada");
    }
});

module.exports = router;