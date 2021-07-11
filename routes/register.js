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
        card,
        type_card, 
        num_card, 
        last_four_digits, 
        CVV, 
        year_exp, 
        month_exp
    } = req.body;

    const dato_register = objData.filter( usuario => usuario.num_Doc === num_Doc);

    if (dato_register.length > 0) {

        res.json("Identificacion ya se encuentra registrada");
        console.log("Identificacion ya se encuentra registrada");

    }else{

        const salt = bcrypt.genSalt(10);
        let passwordHash = bcrypt.hashSync(password, 8);
                
        let new_Register = {
            uuid: uuid(),
            num_Doc,
            tipo_Doc,
            nombres,
            apellidos,
            username,
            password: passwordHash,
            email,
            token,
            type_card, 
            num_card, 
            last_four_digits, 
            CVV, 
            year_exp, 
            month_exp
            
        };
        objData.push(new_Register);

        const json_data = JSON.stringify(objData);

        fs.writeFileSync('src/data.json', json_data, 'utf-8');
        res.json('Registro Exitoso!')
        console.log('Registro Exitoso!')
    }
});

module.exports = router;